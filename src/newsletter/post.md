---
layout: 'default.liquid'
pagination:
    data: newsletter
    size: 1
    alias: post
permalink: "newsletter/{{ post.title | slugify }}/"
---

<div class="reading-width main">
<h1>Newsletter {{ post.date | date: "%Y-%m-%d" }}</h1>

<br />
<hr />
<br />

{{ post.content }}
</div>
