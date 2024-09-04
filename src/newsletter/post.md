---
layout: 'default.liquid'
pagination:
    data: newsletter
    size: 1
    alias: post
permalink: "newsletter/{{ post.title | slugify }}/"
eleventyComputed:
  title: "{{ post.title }}"
---

<div class="reading-width main">
<h1>{{ post.title }}</h1>

<br />
<hr />
<br />

{{ post.content }}
</div>
