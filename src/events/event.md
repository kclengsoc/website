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

  {% if post.images %}
    <div class="event-images">
      <h4>Pictures of Event:</h4>
      <div class="image-gallery">
        {% for img in post.images %}
          <img src="{{ img }}" alt="{{ post.title }} photo" />
        {% endfor %}
      </div>
    </div>
  {% endif %}
 </div> <!-- end reading-width -->
</div> <!-- end outer div -->
