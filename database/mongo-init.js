db.createUser({
    user: "admin",
    pwd: "admin123",
    roles: [{ role: "readWrite", db: "watchlist" }]
  });
  
  db.createCollection("watchlists");
  db.createCollection("videos");
  db.createCollection("users");
  
  db.watchlists.insertMany([
    { userId: "sampleUser1", items: [] },
    { userId: "sampleUser2", items: [] }
  ]);
  
  db.videos.insertOne({
    title: "Sample Video",
    description: "This is a sample video.",
    url: "https://example.com/sample-video.mp4"
  });
  