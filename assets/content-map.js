const contentSections = [
  { id: "home", title: "首页", tags: ["游戏", "推荐", "热门", "爱游戏"], url: "https://mainzh-aiyouxi.com.cn" },
  { id: "news", title: "新闻", tags: ["资讯", "更新", "爱游戏", "公告"], url: "https://mainzh-aiyouxi.com.cn/news" },
  { id: "guides", title: "攻略", tags: ["攻略", "技巧", "教程", "爱游戏"], url: "https://mainzh-aiyouxi.com.cn/guides" },
  { id: "community", title: "社区", tags: ["论坛", "讨论", "分享", "爱游戏"], url: "https://mainzh-aiyouxi.com.cn/community" },
  { id: "about", title: "关于", tags: ["介绍", "团队", "联系", "爱游戏"], url: "https://mainzh-aiyouxi.com.cn/about" }
];

const keywordGroups = [
  { group: "平台", keywords: ["网站", "门户", "爱游戏", "首页"] },
  { group: "内容", keywords: ["攻略", "评测", "视频", "爱游戏"] },
  { group: "活动", keywords: ["比赛", "抽奖", "福利", "爱游戏"] }
];

function filterSectionsByTags(tagList, sections = contentSections) {
  const results = [];
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    let matchCount = 0;
    for (let t = 0; t < tagList.length; t++) {
      if (section.tags.indexOf(tagList[t]) !== -1) {
        matchCount++;
      }
    }
    if (matchCount > 0) {
      results.push({ ...section, matchStrength: matchCount });
    }
  }
  results.sort((a, b) => b.matchStrength - a.matchStrength);
  return results;
}

function searchContent(query, sections = contentSections) {
  const lowerQuery = query.toLowerCase();
  const matched = [];
  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    if (sec.title.toLowerCase().indexOf(lowerQuery) !== -1) {
      matched.push({ ...sec, matchField: "title" });
      continue;
    }
    for (let j = 0; j < sec.tags.length; j++) {
      if (sec.tags[j].toLowerCase().indexOf(lowerQuery) !== -1) {
        matched.push({ ...sec, matchField: "tags" });
        break;
      }
    }
  }
  return matched;
}

function getSectionsByGroup(groupName, groups = keywordGroups, sections = contentSections) {
  const group = groups.find(g => g.group === groupName);
  if (!group) return [];
  return filterSectionsByTags(group.keywords, sections);
}

function displaySearchResults(results) {
  if (results.length === 0) {
    console.log("未找到匹配的内容分区。");
    return;
  }
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    console.log(`[${r.id}] ${r.title} (匹配: ${r.matchField || r.matchStrength})`);
    console.log(`  路径: ${r.url}`);
  }
}

const exampleQuery = "爱游戏";
const exampleResults = searchContent(exampleQuery);
displaySearchResults(exampleResults);

const groupResults = getSectionsByGroup("内容");
console.log("按'内容'分组过滤的分区:");
displaySearchResults(groupResults);