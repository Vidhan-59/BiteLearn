BiteLearn

BiteLearn is a comprehensive educational platform designed to enhance learning experiences by leveraging state-of-the-art machine learning models from Hugging Face. This project, developed as a part of my second-year academic curriculum, focuses on generating questions and multiple-choice options from video and PDF content. Additionally, it provides personalized topic-based recommendations and tracks user progress with a detailed record of their learning journey.

Features

1. Question Generation

Extracts content from YouTube videos and PDF files.

Utilizes Hugging Face ML models to generate questions and multiple-choice options based on the extracted content.

2. Topic-Based Recommendations

Analyzes the content to recommend related topics and resources for further study.

3. User Progress Tracking

Tracks user activity and progress.

Maintains a detailed record of all user interactions, including completed tasks, scores, and past learning history.

4. Modern Web Application

Built with Django for the backend and React Vite for the frontend.

Seamless integration of REST APIs for efficient communication between the backend and frontend.

Responsive and user-friendly UI designed with Tailwind CSS.

Tech Stack

Backend

Django: For building the backend API.

MongoEngine: For database interactions.

Hugging Face Transformers: For ML-based question generation.

PyMuPDF (fitz): For handling PDF processing.

Frontend

React Vite: For building the frontend application.

Tailwind CSS: For responsive and modern UI styling.

Database

MongoDB: For storing user data, progress records, and generated questions.

Installation and Setup

Prerequisites

Python (>=3.9)

Node.js (>=16.x)

MongoDB (>=5.0)

Backend Setup

Clone the repository:

git clone https://github.com/yourusername/bitelearn.git
cd bitelearn/backend

Create a virtual environment and activate it:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start the Django server:

python manage.py runserver

Frontend Setup

Navigate to the frontend directory:

cd bitelearn/frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Database Configuration

Ensure MongoDB is running locally or configure the connection string in the Django settings file.

Run database migrations (if applicable):

python manage.py makemigrations
python manage.py migrate

Usage

Upload a YouTube video URL or PDF file on the home page.

Generate questions and options using the "Generate Questions" feature.

View personalized topic-based recommendations based on the uploaded content.

Track your progress and view detailed records of your learning journey.

Folder Structure

├── backend
│   ├── manage.py
│   ├── myapp
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   └── requirements.txt
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md

Future Enhancements

Add support for more file formats (e.g., Word documents, ePub).

Implement advanced analytics for deeper insights into user progress.

Integrate a chatbot for real-time assistance.

Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

License

This project is licensed under the MIT License.

Acknowledgements

Hugging Face for providing powerful ML models.

PyMuPDF for PDF processing.

My mentors and peers for their support throughout this project.

