"use server";
import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const token = process.env.GITHUB_TOKEN || "";
const owner = process.env.GITHUB_OWNER || "";
const repo = process.env.GITHUB_REPO || "";

const octokit = new Octokit({ auth: token });

const categoryLabelPrefix = "category/";
const pageLabelPrefix = "page/";

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(remarkGfm).use(html).process(markdown);
  return result.toString();
};

export async function getLabels() {
  const { data } = await octokit.issues.listLabelsForRepo({
    owner,
    repo,
  });
  return data;
}

export async function createLabel(name: string) {
  const { data } = await octokit.issues.createLabel({
    owner,
    repo,
    name,
  });
  return data;
}

export async function deleteLabel(name: string) {
  await octokit.issues.deleteLabel({
    owner,
    repo,
    name,
  });
}

export async function getCategories() {
  const labels = await getLabels();
  return labels
    .filter((label) => label.name.startsWith(categoryLabelPrefix))
    .map((label) => label.name.replace(categoryLabelPrefix, ""));
}

export async function createCategory(name: string) {
  return createLabel(`${categoryLabelPrefix}${name}`);
}

export async function deleteCategory(name: string) {
  return deleteLabel(`${categoryLabelPrefix}${name}`);
}

export async function getPages() {
  const labels = await getLabels();
  return labels
    .filter((label) => label.name.startsWith(pageLabelPrefix))
    .map((label) => label.name.replace(pageLabelPrefix, ""));
}

export async function createPage(name: string) {
  return createLabel(`${pageLabelPrefix}${name}`);
}

export async function deletePage(name: string) {
  return deleteLabel(`${pageLabelPrefix}${name}`);
}

export async function getAllPosts() {
  const allPosts = [];
  const iterater = octokit.paginate.iterator(octokit.issues.listForRepo, {
    owner,
    repo,
    per_page: 100,
  });
  for await (const response of iterater) {
    for (const post of response.data) {
      const matterResult = matter(post.body ?? "");

      const date: string = String(matterResult.data.date) || "";
      const updated: string = String(matterResult.data.updated) || "";
      const created_at: string = updated ? updated : date;

      post.created_at = created_at ? created_at : post.created_at;
      post.created_at = dayjs(post.created_at)
        .utc()
        .format("YYYY-MM-DD HH:mm:ss");
      const processedBody = await markdownToHtml(matterResult.content);
      post.body = processedBody;
    }
    allPosts.push(...response.data);
  }
  return allPosts
    .filter((post) =>
      post.labels.some((label) => {
        if (typeof label === "string") {
          return label.startsWith(categoryLabelPrefix);
        } else {
          return label.name && label.name.startsWith(categoryLabelPrefix);
        }
      })
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function getPostById(id: number) {
  const { data } = await octokit.issues.get({
    owner,
    repo,
    issue_number: id,
  });
  const matterResult = matter(data.body ?? "");
  const date: string = String(matterResult.data.date) || "";
  const updated: string = String(matterResult.data.updated) || "";
  const created_at: string = updated ? updated : date;
  data.created_at = created_at ? created_at : data.created_at;
  data.created_at = dayjs(data.created_at).utc().format("YYYY-MM-DD HH:mm:ss");
  const processedBody = await markdownToHtml(matterResult.content);
  data.body = processedBody;
  return data;
}

export async function getPostsByCategory(category: string) {
  const { data } = await octokit.issues.listForRepo({
    owner,
    repo,
    labels: `${categoryLabelPrefix}${category}`,
  });
  return data;
}

export async function getPostsByLabel(label: string) {
  const { data } = await octokit.issues.listForRepo({
    owner,
    repo,
    labels: label,
  });
  return data;
}

export async function getLatestPostByPage(page: string) {
  const { data } = await octokit.issues.listForRepo({
    owner,
    repo,
    labels: `${pageLabelPrefix}${page}`,
  });
  if (data.length === 0) {
    return null;
  }
  const pageData = data[0];
  const matterResult = matter(pageData.body ?? "");
  const date: string = String(matterResult.data.date) || "";
  const updated: string = String(matterResult.data.updated) || "";
  const created_at: string = updated ? updated : date;
  pageData.created_at = created_at ? created_at : pageData.created_at;
  pageData.created_at = dayjs(pageData.created_at)
    .utc()
    .format("YYYY-MM-DD HH:mm:ss");
  const processedBody = await markdownToHtml(matterResult.content);
  pageData.body = processedBody;
  return pageData;
}

export async function createPost(
  title: string,
  body: string,
  category: string,
  labels: string[]
) {
  labels.push(`${categoryLabelPrefix}${category}`);
  const { data } = await octokit.issues.create({
    owner,
    repo,
    title,
    body,
    labels,
  });
  return data;
}

export async function updatePost(
  id: number,
  title: string,
  body: string,
  category: string,
  labels: string[]
) {
  labels.push(`${categoryLabelPrefix}${category}`);
  const { data } = await octokit.issues.update({
    owner,
    repo,
    issue_number: id,
    title,
    body,
    labels,
  });
  return data;
}

export async function createPagePost(
  title: string,
  body: string,
  page: string,
  labels: string[]
) {
  labels.push(`${pageLabelPrefix}${page}`);
  const { data } = await octokit.issues.create({
    owner,
    repo,
    title,
    body,
    labels,
  });
  return data;
}
