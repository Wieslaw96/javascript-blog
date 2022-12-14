const titleClickHandler = function (event) {
	event.preventDefault();
	const clickedElement = this;

	/* [DONE]remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll(".titles a.active");

	for (let activeLink of activeLinks) {
		activeLink.classList.remove("active");
	}

	/* [IN PROGRESS]add class 'active' to the clicked link */

	clickedElement.classList.add("active");

	/* [DONE]remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll(".posts article.active");

	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove("active");
	}

	/* get 'href' attribute from the clicked link */
	const articleSelector = clickedElement.getAttribute("href");
	console.log(articleSelector);

	/* find the correct article using the selector (value of 'href' attribute) */
	const targetArticle = document.querySelector(articleSelector);
	console.log(targetArticle);

	/* add class 'active' to the correct article */
	targetArticle.classList.add("active");
};

/*const links = document.querySelectorAll(".titles a");
	

	for (let link of links) {
		link.addEventListener("click", titleClickHandler);
	}*/
const optArticleSelector = ".post",
	optTitleSelector = ".post-title",
	optTitleListSelector = ".titles",
	optArticleTagsSelector = ".post-tags .list",
	optArticleAuthorSelector = ".post .post-author",
	optTagsListSelector = ".tags.list";

function generateTitleLinks(customSelector = "") {
	/* remove contents of titleList */
	const titleList = document.querySelector(optTitleListSelector);
	titleList.innerHTML = "";

	/* for each article */

	const articles = document.querySelectorAll(
		optArticleSelector + customSelector
	);
	let html = "";
	for (let article of articles) {
		/* get the article id */
		const articleId = article.getAttribute("id");

		/* find the title element */

		/* get the title from the title element */
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;

		/* create HTML of the link */
		const linkHTML =
			'<li><a href="#' +
			articleId +
			'"><span>' +
			articleTitle +
			"</span></a></li>";

		/* insert link into titleList */
		html = html + linkHTML;
	}
	titleList.innerHTML = html;
	const links = document.querySelectorAll(".titles a");

	for (let link of links) {
		link.addEventListener("click", titleClickHandler);
	}
}

generateTitleLinks();

function generateTags() {
	/* [NEW] create a new variable allTags with an empty array */
	let allTags = {};
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);

	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find tags wrapper */
		const tagsWrapper = article.querySelector(optArticleTagsSelector);
		/* make html variable with empty string */
		let html = "";
		/* get tags from data-tags attribute */
		const articleTags = article.getAttribute("data-tags");

		/* split tags into array */
		const articleTagsArray = articleTags.split(" ");

		/* START LOOP: for each tag */
		for (let tag of articleTagsArray) {
			/* generate HTML of the link */
			const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
			/* add generated code to html variable */
			html = html + linkHTML;
			/* [NEW] check if this link is NOT already in allTags */
			if (!allTags[tag]) {
				/* [NEW] add tag to allTags object */
				allTags[tag] = 1;
			} else {
				allTags[tag]++;
			}
			/* END LOOP: for each tag */
		}
		/* insert HTML of all the links into the tags wrapper */
		tagsWrapper.innerHTML = html;

		/* END LOOP: for every article: */
	}
	/* [NEW] find list of tags in right column */
	const tagList = document.querySelector(optTagsListSelector);

	/* [NEW] create variable for all links HTML code */
	let allTagsHTML = "";

	/* [NEW] START LOOP: for each tag in allTags: */
	for (let tag in allTags) {
		/* [NEW] generate code of a link and add it to allTagsHTML */
		//	allTagsHTML += tag + " (" + allTags[tag] + ") ";
		allTagsHTML +=
			'<li><a href="#tag-' +
			tag +
			'">' +
			tag +
			" (" +
			allTags[tag] +
			") " +
			"</a></li>";
	}
	/* [NEW] END LOOP: for each tag in allTags: */

	/*[NEW] add HTML from allTagsHTML to tagList */
	tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
	/* prevent default action for this event */
	event.preventDefault();

	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;

	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute("href");

	/* make a new constant "tag" and extract tag from the "href" constant */
	const tag = href.replace("#tag-", "");

	/* find all tag links with class active */
	const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

	/* START LOOP: for each active tag link */
	for (let activeTag of activeTags) {
		/* remove class active */
		activeTag.classList.remove("active");

		/* END LOOP: for each active tag link */
	}
	/* find all tag links with "href" attribute equal to the "href" constant */
	const linkTags = document.querySelectorAll(href);

	/* START LOOP: for each found tag link */
	for (let linkTag of linkTags) {
		/* add class active */
		linkTag.classList.add("active");

		/* END LOOP: for each found tag link */
	}
	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
	/* find all links to tags */
	const allTagLinks = ".post-tags .list a";
	const allLinks = document.querySelectorAll([allTagLinks, ".list.tags a"]);

	/* START LOOP: for each link */
	for (let eachLink of allLinks) {
		/* add tagClickHandler as event listener for that link */
		eachLink.addEventListener("click", tagClickHandler);
		/* END LOOP: for each link */
	}
}

addClickListenersToTags();

function generateAuthors() {
	const articles = document.querySelectorAll(optArticleSelector);

	for (let article of articles) {
		const authorWrapper = article.querySelector(optArticleAuthorSelector);

		const articleAuthor = article.getAttribute("data-author");

		const linkHTML =
			'<a href="#author-' + articleAuthor + '">' + articleAuthor + "</a>";

		authorWrapper.innerHTML = linkHTML;
	}
}
generateAuthors();

function authorClickHandler(event) {
	event.preventDefault();

	const clickedElement = this;

	const href = clickedElement.getAttribute("href");

	const author = href.replace("#author-", "");

	const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

	for (let activeAuthor of activeAuthors) {
		activeAuthor.classList.remove("active");
	}
	//#author-Theo Tabby
	const linkAuthors = document.querySelectorAll('a[href="' + href + '"]');

	for (let linkAuthor of linkAuthors) {
		linkAuthor.classList.add("active");
	}

	generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
	const allAuthorLinks = ".post .post-author a";
	const allLinks = document.querySelectorAll(allAuthorLinks);

	for (let eachLink of allLinks) {
		eachLink.addEventListener("click", authorClickHandler);
	}
}

addClickListenersToAuthors();
