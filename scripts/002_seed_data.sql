-- Insert sample courses
INSERT INTO courses (title, description, image_url, duration, level, price, is_featured) VALUES
('Introduction to Artificial Intelligence', 'Learn the fundamentals of AI and machine learning algorithms', '/ai-artificial-intelligence-course.jpg', '8 weeks', 'Beginner', 299.99, true),
('Data Science with Python', 'Master data analysis and visualization using Python', '/data-science-analytics-charts.jpg', '12 weeks', 'Intermediate', 399.99, true),
('Machine Learning Algorithms', 'Deep dive into ML algorithms and their applications', '/machine-learning-algorithms-neural-network.jpg', '10 weeks', 'Advanced', 499.99, false),
('Deep Learning Fundamentals', 'Understanding neural networks and deep learning', '/deep-learning-neural-networks.png', '14 weeks', 'Advanced', 599.99, true);

-- Insert sample video courses
INSERT INTO video_courses (title, description, image_url, video_url, duration, level, price, is_featured) VALUES
('AI Basics Video Series', 'Comprehensive video course on AI fundamentals', '/ai-artificial-intelligence-course.jpg', 'https://example.com/video1', '6 hours', 'Beginner', 99.99, true),
('Python for Data Science', 'Learn Python programming for data analysis', '/data-science-analytics-charts.jpg', 'https://example.com/video2', '8 hours', 'Intermediate', 149.99, false);

-- Insert sample blog posts
INSERT INTO blog_posts (title, content, excerpt, image_url, slug, published) VALUES
('The Future of Artificial Intelligence', 'Artificial Intelligence is transforming every industry...', 'Exploring how AI is reshaping our world', '/ai-artificial-intelligence-course.jpg', 'future-of-ai', true),
('Getting Started with Machine Learning', 'Machine learning can seem daunting at first...', 'A beginner-friendly guide to ML concepts', '/machine-learning-algorithms-neural-network.jpg', 'getting-started-ml', true),
('Data Science Best Practices', 'Working with data requires careful attention...', 'Essential practices for data scientists', '/data-science-analytics-charts.jpg', 'data-science-best-practices', false);

-- Insert sample talks and events
INSERT INTO talks_events (title, description, event_date, location, event_type, image_url, registration_url) VALUES
('AI in Healthcare Conference', 'Exploring applications of AI in medical field', '2024-06-15', 'Yerevan, Armenia', 'conference', '/ai-artificial-intelligence-course.jpg', 'https://example.com/register1'),
('Machine Learning Workshop', 'Hands-on workshop for ML practitioners', '2024-07-20', 'Online', 'workshop', '/machine-learning-algorithms-neural-network.jpg', 'https://example.com/register2');

-- Insert sample projects
INSERT INTO projects (title, description, image_url, project_url, github_url, technologies, category) VALUES
('AI-Powered Analytics Platform', 'A comprehensive analytics platform using machine learning', '/data-science-analytics-charts.jpg', 'https://example.com/project1', 'https://github.com/example/project1', ARRAY['Python', 'TensorFlow', 'React', 'PostgreSQL'], 'Web Application'),
('Neural Network Visualization Tool', 'Interactive tool for visualizing neural network architectures', '/deep-learning-neural-networks.png', 'https://example.com/project2', 'https://github.com/example/project2', ARRAY['JavaScript', 'D3.js', 'Python', 'Flask'], 'Visualization');

-- Insert sample companies
INSERT INTO companies (name, description, logo_url, website_url, partnership_type) VALUES
('French University of Armenia', 'Leading educational institution in Armenia', '/ufar-university-logo.jpg', 'https://ufar.am', 'partner'),
('National Polytechnic University of Armenia', 'Premier technical university', '/npua-university-logo.jpg', 'https://npua.am', 'partner'),
('Armenian State University of Economics', 'Top economics and business university', '/asue-university-logo.jpg', 'https://asue.am', 'partner'),
('Gavar State University', 'Regional university with strong programs', '/gsu-university-logo.jpg', 'https://gsu.am', 'partner'),
('Ardy Academy', 'Professional training and development center', '/ardy-academy-logo.jpg', 'https://ardy.am', 'client');
