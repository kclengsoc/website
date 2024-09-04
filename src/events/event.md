---
layout: 'default.liquid'
tags:
    - event
pagination:
    data: event
    size: 1
    alias: post
permalink: "events/{{ post.title | slugify }}/"
eleventyComputed:
  title: "{{ post.title }}"
---

<div>
 <br />
 <a class="medium" href="/events">< Back to events</a>
 <br />
 <br />
 <div class="reading-width">
  <h1>{{ post.title }}</h1>
  <p class="medium">{{ post.location }}</p>
  <p class="gray medium">{{ post.date | date: "%Y %B %d%q" }}</p>

  <br />
  <hr />
  <br />

  {{ post.content }}
 </div>
</div>
