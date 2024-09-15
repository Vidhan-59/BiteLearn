// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/Input';
// import { Label } from '../components/ui/Label';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
// import { BookOpen } from 'lucide-react';
// import Cookies from 'js-cookie';
// import { RadioGroup, RadioGroupItem } from '../components/ui/RadioGroup';
// import { ExternalLink, ThumbsUp, Eye } from 'lucide-react'
// import { Badge } from '../components/ui/Badge';
// import Progress from '../components/ui/Progress';
// const Home = () => {
//   const [videoUrl, setVideoUrl] = useState('');
//   const [pdfFile, setPdfFile] = useState(null);
//   const [topic, setTopic] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [videoId, setVideoId] = useState(''); // State to store video_id
//   const [error, setError] = useState(""); // To hold error messages
//   const [quizResults, setQuizResults] = useState(null);
//   const navigate = useNavigate();
//   const handleVideoSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = Cookies.get('auth_token');
//       console.log(token)
//       if (!token) {
//         console.log("here")
//         setError("You are not allowed to access this page. Redirecting to signup...");
//         setTimeout(() => {
//           navigate("/signup"); // Redirect after 2 seconds
//         }, 2000);
//         return;
//       }
//       const response = await fetch('http://localhost:8000/api/upload/video/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ video_url: videoUrl })
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }
  
//       const data = await response.json();
//       console.log('Backend response:', data); // Log the response to check its structure
//       setQuestions(data.questions);
//       setVideoId(data.video_id); // Set the video ID from the response
//     } catch (error) {
//       console.error('Error fetching video questions:', error);
//     }
//   };

//   const handlePdfSubmit = (e) => {
//     e.preventDefault();
//     console.log('PDF file submitted:', pdfFile);
//   };

//   const handleRecommendationSubmit = async (e) => {
//     e.preventDefault();

//     if (!topic.trim()) {
//       alert('Please enter at least one topic.');
//       return;
//     }

//     try {
//       const topicsArray = topic.split(',').map(t => t.trim()).filter(t => t.length > 0);
//       const token = Cookies.get('auth_token');
//       if (!token) {
//         setError("You are not allowed to access this page. Redirecting to signup...");
//         setTimeout(() => {
//           navigate("/signup"); // Redirect after 2 seconds
//         }, 2000);
//         return;
//       }
//       const response = await fetch('http://localhost:8000/api/recommendations/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ topics: topicsArray })
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }

//       const data = await response.json();
//       setRecommendations(data);
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//     }
//   };

//   const handleAnswerChange = (questionIndex, selectedOption) => {
//     setUserAnswers(prevAnswers => ({
//       ...prevAnswers,
//       [questions[questionIndex].question]: selectedOption
//     }));
//   };

//   const handleQuizSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoId) {
//       alert('Please submit a video first.');
//       return;
//     }

//     try {
//       const formattedAnswers = questions.map((q) => ({
//         question: q.question,
//         selected_option: userAnswers[q.question] || '',
//       }));

//       const response = await fetch('http://localhost:8000/api/submit_answer/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${Cookies.get('auth_token')}`,
//         },
//         body: JSON.stringify({
//           video: videoId,
//           answers: formattedAnswers,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }

//       const resultData = await response.json();
//       setQuizResults(resultData); // Save the results returned from the backend
//       alert('Quiz submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       setError('An error occurred while submitting the quiz.');
//     }
//   };

//   const calculatePercentage = () => {
//     if (!quizResults || !quizResults.score) return 0;
//     return (quizResults.score.total_correct / quizResults.score.total_questions) * 100;
//   };

//   const percentage = calculatePercentage();


//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//             <BookOpen className="mr-2 h-8 w-8 text-blue-500" />
//             Bitelearn
//           </h1>
//           <nav>
//             <Button variant="ghost">About</Button>
//             <Button variant="ghost">Contact</Button>
//             <Button variant="outline">Login</Button>
//           </nav>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome to Bitelearn</h2>
//           <p className="text-lg text-gray-700 mb-8">Enhance your learning experience with our AI-powered question generation tools.</p>

//           <Tabs defaultValue="video">
//             {(activeTab, setActiveTab) => (
//               <>
//                 <TabsList>
//                   <TabsTrigger value="video" setActiveTab={setActiveTab}>Video Questions</TabsTrigger>
//                   <TabsTrigger value="pdf" setActiveTab={setActiveTab}>PDF Questions</TabsTrigger>
//                   <TabsTrigger value="recommendations" setActiveTab={setActiveTab}>Get Recommendations</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="video" activeTab={activeTab}>
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Generate Questions from Video</CardTitle>
//                       <CardDescription>Enter a YouTube video URL to get questions and answers.</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <form onSubmit={handleVideoSubmit}>
//                         <Label htmlFor="videoUrl">YouTube Video URL</Label>
//                         <Input
//                           id="videoUrl"
//                           placeholder="https://www.youtube.com/watch?v=..."
//                           value={videoUrl}
//                           onChange={(e) => setVideoUrl(e.target.value)}
//                         />
//                         <Button type="submit" className="mt-4">Generate Questions</Button>
//                       </form>
//                     </CardContent>
//                     <CardFooter className="flex justify-between">
//                       <Button variant="outline" onClick={() => setVideoUrl('')}>Clear</Button>
//                     </CardFooter>
//                   </Card>

//                   {questions.length > 0 && (
//                     <Card className="mt-8">
//                       <CardHeader>
//                         <CardTitle>Quiz</CardTitle>
//                         <CardDescription>Answer the questions below.</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <form onSubmit={handleQuizSubmit}>
//                           {questions.map((q, index) => (
//                             <div key={index} className="mb-8 last:mb-0">
//                               <p className="font-semibold mb-3 text-lg">
//                                 {index + 1}. {q.question}
//                               </p>
//                               <RadioGroup
//                                 value={userAnswers[q.question] || ""}
//                                 onValueChange={(value) => handleAnswerChange(index, value)}
//                                 className="space-y-2"
//                               >
//                                 {q.options.map((option, optionIndex) => (
//                                   <RadioGroupItem
//                                     key={optionIndex}
//                                     value={option}
//                                     id={`question-${index}-option-${optionIndex}`}
//                                   >
//                                     {option}
//                                   </RadioGroupItem>
//                                 ))}
//                               </RadioGroup>
//                             </div>
//                           ))}
//                           <Button type="submit">Submit Quiz</Button>
//                         </form>
//                         {quizResults && (
//   <div className="mt-8">
//     <h3 className="text-xl font-semibold">Results</h3>
//     <Progress value={percentage} className="mt-4">
//       {percentage.toFixed(2)}%
//     </Progress>
//     {quizResults.results.map((result, index) => (
//       <Card key={index} className="mt-4">
//         <CardContent>
//           <p className="font-semibold">
//             Question {index + 1}: {result.question}
//           </p>
//           <p className={`mt-1 text-sm ${result.is_correct ? 'text-green-500' : 'text-red-500'}`}>
//             Your answer: {result.selected_option}
//           </p>
//           {!result.is_correct && (
//             <p className="mt-1 text-sm text-red-500">Correct answer: {result.correct_answer}</p>
//           )}
//         </CardContent>
//       </Card>
//     ))}
//   </div>
// )}
//                       </CardContent>
//                     </Card>
//                   )}
//                 </TabsContent>
//                 <TabsContent value="pdf" activeTab={activeTab}>
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Generate Questions from PDF</CardTitle>
//                       <CardDescription>Upload a PDF file to get questions and answers.</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <form onSubmit={handlePdfSubmit}>
//                         <Label htmlFor="pdfFile">Upload PDF</Label>
//                         <Input
//                           type="file"
//                           id="pdfFile"
//                           onChange={(e) => setPdfFile(e.target.files[0])}
//                         />
//                         <Button type="submit" className="mt-4">Generate Questions</Button>
//                       </form>
//                     </CardContent>
//                     <CardFooter className="flex justify-between">
//                       <Button variant="outline" onClick={() => setPdfFile(null)}>Clear</Button>
//                     </CardFooter>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value="recommendations" activeTab={activeTab}>
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Get Personalized Recommendations</CardTitle>
//                       <CardDescription>Enter topics of interest to get tailored recommendations.</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <form onSubmit={handleRecommendationSubmit}>
//                         <Label htmlFor="topic">Topics (comma separated)</Label>
//                         <Input
//                           id="topic"
//                           placeholder="e.g., AI, Machine Learning"
//                           value={topic}
//                           onChange={(e) => setTopic(e.target.value)}
//                         />
//                         <Button type="submit" className="mt-4">Get Recommendations</Button>
//                       </form>
//                     </CardContent>
//                     <CardFooter className="flex justify-between">
//                       <Button variant="outline" onClick={() => setTopic('')}>Clear</Button>
//                     </CardFooter>
//                   </Card>

//                   <div className="max-w-4xl mx-auto p-4">
//       {recommendations.length > 0 && (
//       <Card className="mt-8 bg-gradient-to-b from-blue-100 to-white">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Recommended Videos</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="space-y-6">
//             {recommendations.map((rec, index) => (
//               <li 
//                 key={index} 
//                 className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
//               >
//                 <div className="p-6">
//                   <h3 className="font-semibold text-xl mb-2 text-blue-600">{rec.title}</h3>
//                   <p className="text-gray-600 mb-4">{rec.description}</p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <Badge variant="secondary" className="flex items-center space-x-1">
//                         <Eye className="w-4 h-4" />
//                         <span>{rec.views.toLocaleString()}</span>
//                       </Badge>
//                       <Badge variant="secondary" className="flex items-center space-x-1">
//                         <ThumbsUp className="w-4 h-4" />
//                         <span>{rec.likes.toLocaleString()}</span>
//                       </Badge>
//                     </div>
//                     <Button asChild>
//                       <a 
//                         href={rec.url} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="flex items-center space-x-2"
//                       >
//                         <span>Watch Video</span>
//                         <ExternalLink className="w-4 h-4" />
//                       </a>
//                     </Button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//                 </TabsContent>
//               </>
//             )}
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;



















import { useState , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import { BookOpen } from 'lucide-react';
import Cookies from 'js-cookie';
import { RadioGroup, RadioGroupItem } from '../components/ui/RadioGroup';
import { ExternalLink, ThumbsUp, Eye } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import Progress from '../components/ui/Progress';
import { FiUser } from 'react-icons/fi';
const Home = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [topic, setTopic] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [videoquestions, setvideoQuestions] = useState([]);
  const [pdfquestions, setpdfQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [videoId, setVideoId] = useState(''); // State to store video_id
  const [pdfId, setpdfId] = useState(''); // State to store video_id
  const [error, setError] = useState(""); // To hold error messages
  const [videoquizResults, setvideoQuizResults] = useState(null);
  const [pdfquizResults, setPdfquizResults] = useState(null); // State to store PDF results
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the username exists in cookies or localStorage
    const savedUsername = Cookies.get('username'); // or localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };


  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setVideoId('')
    setpdfId('')
    setvideoQuestions([])
    setvideoQuizResults('')
    try {
      const token = Cookies.get('auth_token');
      if (!token) {
        setError("You are not allowed to access this page. Redirecting to signup...");
        setTimeout(() => {
          navigate("/signup"); // Redirect after 2 seconds
        }, 2000);
        return;
      }
      const response = await fetch('http://localhost:8000/api/upload/video/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ video_url: videoUrl })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      setvideoQuestions(data.questions);  // set video question
      setVideoId(data.video_id); // Set the video ID from the response
      console.log(data.questions)
      setUserAnswers({})
    } catch (error) {
      console.error('Error fetching video questions:', error);
    }
  };

  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      alert('Please select a PDF file to upload.');
      return;
    }
    
    try {
      const token = Cookies.get('auth_token');
      setpdfId('')
      setVideoId('')
      setpdfQuestions([])
      setPdfquizResults('')
      if (!token) {
        setError("You are not allowed to access this page. Redirecting to signup...");
        setTimeout(() => {
          navigate("/signup"); // Redirect after 2 seconds
        }, 2000);
        return;
      }
  
      // Create FormData object
      const formData = new FormData();
      formData.append('pdf_file', pdfFile);
  
      const response = await fetch('http://localhost:8000/api/upload/pdf/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      setpdfQuestions(data.questions);
      setpdfId(data.file_id); // Set the pdf ID from the response
      console.log(data.questions)
      setUserAnswers({})
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setError('An error occurred while uploading the PDF.');
    }
  };

  const handleRecommendationSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      alert('Please enter at least one topic.');
      return;
    }

    try {
      const topicsArray = topic.split(',').map(t => t.trim()).filter(t => t.length > 0);
      const token = Cookies.get('auth_token');
      if (!token) {
        setError("You are not allowed to access this page. Redirecting to signup...");
        setTimeout(() => {
          navigate("/signup"); // Redirect after 2 seconds
        }, 2000);
        return;
      }
      const response = await fetch('http://localhost:8000/api/recommendations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ topics: topicsArray })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    if (pdfId && pdfquestions && pdfquestions[questionIndex]) {
      // Ensure pdfquestions exists and questionIndex is valid
      console.log(pdfId);
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [pdfquestions[questionIndex].question]: selectedOption
      }));
    } else if (videoId && videoquestions && videoquestions[questionIndex]) {
      // Ensure videoquestions exists and questionIndex is valid
      console.log(videoId);
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [videoquestions[questionIndex].question]: selectedOption
      }));
    } else {
      console.error("Invalid questionIndex or missing data for questions.");
    }
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
  
    if (!videoId && !pdfId) {
      alert('Please submit a video or PDF first.');
      return;
    }
  
    try {
      // Format answers based on whether pdfId or videoId is set
      const formattedAnswers = (pdfId ? pdfquestions : videoquestions).map((q) => ({
        question: q.question,
        selected_option: userAnswers[q.question] || '',
      }));
  
      const requestBody = {
        answers: formattedAnswers,
        ...(pdfId ? { pdf: pdfId } : { video: videoId })  // Add either pdfId or videoId
      };
  
      console.log("Request Body:", requestBody);
  
      // Submit the quiz answers
      const response = await fetch('http://localhost:8000/api/submit_answer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const resultData = await response.json();
  
      // Update the results state based on whether pdfId or videoId is set
      if (pdfId) {
        setPdfquizResults(resultData);
        console.log("Quiz results for PDF");
      } else {
        setvideoQuizResults(resultData);
        console.log("Quiz results for video");
      }
  
      alert('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('An error occurred while submitting the quiz.');
    }
  };
  

  const calculatePercentage = () => {
    if(pdfId){
    if (!pdfquizResults || !pdfquizResults.score) return 0;
    return (pdfquizResults.score.total_correct / pdfquizResults.score.total_questions) * 100;
    }
    else{
      if (!videoquizResults || !videoquizResults.score) return 0;
      return (videoquizResults.score.total_correct / videoquizResults.score.total_questions) * 100;
    }
  };

  const percentage = calculatePercentage();


  // for svg 
  const LoginIcon = () => (
    <svg
      viewBox="0 0 640 512"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h362.9c-5.4-9.4-8.6-20.3-8.6-32V352c0-2.1.1-4.2.3-6.3-31-26-71-41.7-114.6-41.7h-91.4zM528 240c17.7 0 32 14.3 32 32v48h-64v-48c0-17.7 14.3-32 32-32zm-80 32v48c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h160c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32v-48c0-44.2-35.8-80-80-80s-80 35.8-80 80z" />
    </svg>
  );

  const UserIcon = (props) => (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="24px" // Adjust size as needed
      width="24px"  // Adjust size as needed
      {...props}
    >
      <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7h450.6c17 0 30.7-13.8 30.7-30.7 0-89.1-72.2-161.3-161.3-161.3H161.3z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BookOpen className="mr-2 h-8 w-8 text-blue-500" />
            Bitelearn
          </h1>
          <nav>
        { username ? (
    <Button
      variant="outline"
      onClick={() => navigate('/userProfile')}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <UserIcon style={{ marginBottom: '8px' }} />
      {username}
    </Button>
  ) : (
        <Button onClick={handleLogin} variant="outline" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <LoginIcon style={{ marginBottom: '8px' }} /> {/* Icon at the top with spacing below */}
  Login
</Button>
      )}
    </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome to Bitelearn</h2>
          <p className="text-lg text-gray-700 mb-8">Enhance your learning experience with our AI-powered question generation tools.</p>

          <Tabs defaultValue="video">
            {(activeTab, setActiveTab) => (
              <>
                <TabsList>
                  <TabsTrigger value="video" setActiveTab={setActiveTab}>Video Questions</TabsTrigger>
                  <TabsTrigger value="pdf" setActiveTab={setActiveTab}>PDF Questions</TabsTrigger>
                  <TabsTrigger value="recommendations" setActiveTab={setActiveTab}>Get Recommendations</TabsTrigger>
                </TabsList>
                <TabsContent value="video" activeTab={activeTab}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Generate Questions from Video</CardTitle>
                      <CardDescription>Enter a YouTube video URL to get questions and answers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleVideoSubmit}>
                        <Label htmlFor="videoUrl">YouTube Video URL</Label>
                        <Input
                          id="videoUrl"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                        />
                        <Button type="submit" className="mt-4">Generate Questions</Button>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setVideoUrl('')}>Clear</Button>
                    </CardFooter>
                  </Card>

                  {videoquestions.length > 0 && (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle>Quiz</CardTitle>
      <CardDescription>Answer the questions below.</CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleQuizSubmit}>
        {videoquestions.map((q, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <p className="font-semibold mb-3 text-lg">
              {index + 1}. {q.question}
            </p>
            <RadioGroup
              value={userAnswers[q.question] || ""}
              onValueChange={(value) => handleAnswerChange(index, value)}
              className="space-y-2"
            >
              {q.options.map((option, optionIndex) => (
                <RadioGroupItem
                  key={optionIndex}
                  value={option}
                  id={`question-${index}-option-${optionIndex}`}
                >
                  {option}
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button type="submit" className="mt-4">Submit Quiz</Button>
      </form>
      {videoquizResults && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Results</h3>
          <Progress value={percentage} className="mt-4">
            {percentage}%
          </Progress>
          {videoquizResults.results.map((result, index) => (
            <Card key={index} className="mt-4">
              <CardContent>
                <p className="font-semibold">
                  Question {index + 1}: {result.question}
                </p>
                <p className={`mt-1 text-sm ${result.is_correct ? 'text-green-500' : 'text-red-500'}`}>
                  Your answer: {result.selected_option}
                </p>
                {!result.is_correct && (
                  <p className="mt-1 text-sm text-red-500">Correct answer: {result.correct_answer}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
)}
                </TabsContent>
                <TabsContent value="pdf" activeTab={activeTab}>
                <Card>
  <CardHeader>
    <CardTitle>Generate Questions from PDF</CardTitle>
    <CardDescription>Upload a PDF file to get questions and answers.</CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={handlePdfSubmit}>
      <Label htmlFor="pdfFile">Upload PDF</Label>
      <Input
        type="file"
        id="pdfFile"
        onChange={(e) => setPdfFile(e.target.files[0])}
      />
      <Button type="submit" className="mt-4">Generate Questions</Button>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline" onClick={() => setPdfFile(null)}>Clear</Button>
  </CardFooter>
</Card>
{pdfquestions.length > 0 && (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle>Quiz</CardTitle>
      <CardDescription>Answer the questions below.</CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleQuizSubmit}>
        {pdfquestions.map((q, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <p className="font-semibold mb-3 text-lg">
              {index + 1}. {q.question}
            </p>
            <RadioGroup
              value={userAnswers[q.question] || ""}
              onValueChange={(value) => handleAnswerChange(index, value)}
              className="space-y-2"
            >
              {q.options.map((option, optionIndex) => (
                <RadioGroupItem
                  key={optionIndex}
                  value={option}
                  id={`question-${index}-option-${optionIndex}`}
                >
                  {option}
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button type="submit" className="mt-4">Submit Quiz</Button>
      </form>
      {pdfquizResults && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Results</h3>
          <Progress value={percentage} className="mt-4">
            {percentage}%
          </Progress>
          {pdfquizResults.results.map((result, index) => (
            <Card key={index} className="mt-4">
              <CardContent>
                <p className="font-semibold">
                  Question {index + 1}: {result.question}
                </p>
                <p className={`mt-1 text-sm ${result.is_correct ? 'text-green-500' : 'text-red-500'}`}>
                  Your answer: {result.selected_option}
                </p>
                {!result.is_correct && (
                  <p className="mt-1 text-sm text-red-500">Correct answer: {result.correct_answer}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
)}
                </TabsContent>
                <TabsContent value="recommendations" activeTab={activeTab}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Get Personalized Recommendations</CardTitle>
                      <CardDescription>Enter topics of interest to get tailored recommendations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleRecommendationSubmit}>
                        <Label htmlFor="topic">Topics (comma separated)</Label>
                        <Input
                          id="topic"
                          placeholder="e.g., AI, Machine Learning"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                        />
                        <Button type="submit" className="mt-4">Get Recommendations</Button>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setTopic('')}>Clear</Button>
                    </CardFooter>
                  </Card>

                  <div className="max-w-4xl mx-auto p-4">
                    {recommendations.length > 0 && (
                      <Card className="mt-8 bg-gradient-to-b from-blue-100 to-white">
                        <CardHeader>
                          <CardTitle className="text-2xl font-bold">Recommended Videos</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-6">
                            {recommendations.map((rec, index) => (
                              <li 
                                key={index} 
                                className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                              >
                                <div className="p-6">
                                  <h3 className="font-semibold text-xl mb-2 text-blue-600">{rec.title}</h3>
                                  <p className="text-gray-600 mb-4">{rec.description}</p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                      <Badge variant="secondary" className="flex items-center space-x-1">
                                        <Eye className="w-4 h-4" />
                                        <span>{rec.views.toLocaleString()}</span>
                                      </Badge>
                                      <Badge variant="secondary" className="flex items-center space-x-1">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span>{rec.likes.toLocaleString()}</span>
                                      </Badge>
                                    </div>
                                    <Button asChild>
                                      <a 
                                        href={rec.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2"
                                      >
                                        <span>Watch Video</span>
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Home;


























// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/Input';
// import { Label } from '../components/ui/Label';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
// import { BookOpen } from 'lucide-react';
// import Cookies from 'js-cookie';
// import { RadioGroup, RadioGroupItem } from '../components/ui/RadioGroup';
// import { ExternalLink, ThumbsUp, Eye } from 'lucide-react';
// import { Badge } from '../components/ui/Badge';
// import Progress from '../components/ui/Progress';

// const Home = () => {
//   const [videoUrl, setVideoUrl] = useState('');
//   const [pdfFile, setPdfFile] = useState(null);
//   const [topic, setTopic] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const [FUllquestions, setFUllquestions] = useState({video_q:[],pdf_q:[]});
//   const [questions, setQuestions] = useState([]);
//   //  set active tab
//   const [active_tab,setActive_tab] = useState('video');

//   const [fulluserAns,setFullUserAns] = useState({video_ans:{},pdf_ans:{}});
//   const [userAnswers, setUserAnswers] = useState({});

//   const [videoId, setVideoId] = useState(''); // State to store video_id
//   const [error, setError] = useState(""); // To hold error messages
//   const [fullQuizResults, setFullQuizResults] = useState({video_res:null,pdf_res:null});
//   const [quizResults, setQuizResults] = useState(null);
//   const navigate = useNavigate();

//   const handleVideoSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = Cookies.get('auth_token');
//       if (!token) {
//         setError("You are not allowed to access this page. Redirecting to signup...");
//         setTimeout(() => {
//           navigate("/signup"); // Redirect after 2 seconds
//         }, 2000);
//         return;
//       }
//       const response = await fetch('http://localhost:8000/api/upload/video/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ video_url: videoUrl })
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }
  
//       const data = await response.json();

//       setFUllquestions({video_q:data.questions,pdf_q:fullQuizResults.pdf_q});
//       setQuestions(data.questions);
      
//       setVideoId(data.video_id); // Set the video ID from the response
//     } catch (error) {
//       console.error('Error fetching video questions:', error);
//     }
//   };

//   const handlePdfSubmit = async (e) => {
//     e.preventDefault();
//     if (!pdfFile) {
//       alert('Please select a PDF file to upload.');
//       return;
//     }
    
//     try {
//       const token = Cookies.get('auth_token');
//       if (!token) {
//         setError("You are not allowed to access this page. Redirecting to signup...");
//         setTimeout(() => {
//           navigate("/signup"); // Redirect after 2 seconds
//         }, 2000);
//         return;
//       }
  
//       // Create FormData object
//       const formData = new FormData();
//       formData.append('pdf_file', pdfFile);
  
//       const response = await fetch('http://localhost:8000/api/upload/pdf/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }
  
//       const data = await response.json();
//       setQuestions(data.questions);
//       setFUllquestions({video_q:fullQuizResults.video_q,pdf_q:data.questions});

//       setVideoId(data.file_id); // Set the pdf ID from the response
//     } catch (error) {
//       console.error('Error uploading PDF:', error);
//       setError('An error occurred while uploading the PDF.');
//     }
//   };

//   const handleRecommendationSubmit = async (e) => {
//     e.preventDefault();

//     if (!topic.trim()) {
//       alert('Please enter at least one topic.');
//       return;
//     }

//     try {
//       const topicsArray = topic.split(',').map(t => t.trim()).filter(t => t.length > 0);
//       const token = Cookies.get('auth_token');
//       if (!token) {
//         setError("You are not allowed to access this page. Redirecting to signup...");
//         setTimeout(() => {
//           navigate("/signup"); // Redirect after 2 seconds
//         }, 2000);
//         return;
//       }
//       const response = await fetch('http://localhost:8000/api/recommendations/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ topics: topicsArray })
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }

//       const data = await response.json();
//       setRecommendations(data);
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//     }
//   };

//   const handleAnswerChange = (questionIndex, selectedOption) => {
//     setUserAnswers(prevAnswers => ({
//       ...prevAnswers,
//       [questions[questionIndex].question]: selectedOption
//     }));
//     if (active_tab=="pdf") {
//         setFullUserAns({...fulluserAns,pdf_ans:{...userAnswers}})
//     }else {setFullUserAns({...fulluserAns,video_ans:{...userAnswers}})}
//   };

//   const handleQuizSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!videoId && !pdfFile) {
//       alert('Please submit a video or PDF first.');
//       return;
//     }
  
//     try {
//       const formattedAnswers = questions.map((q) => ({
//         question: q.question,
//         selected_option: userAnswers[q.question] || '',
//       }));
  
//       const requestBody = {
//         answers: formattedAnswers,
//       };
//       let flag = true;
//       if (pdfFile) {
//         requestBody.pdf = videoId;
//         console.log(requestBody.pdf) 
//         console.log("in pdf")
//         flag = false
//       }
//       if (videoId && flag) {
//         requestBody.video = videoId;
        
//         console.log(requestBody.video)
//         console.log("in video")
//       }
  

  
//       const response = await fetch('http://localhost:8000/api/submit_answer/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${Cookies.get('auth_token')}`,
//         },
//         body: JSON.stringify(requestBody),
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }
  
//       const resultData = await response.json();
//       // setQuizResults(resultData); // Save the results returned from the backend
//       if (active_tab=="video") {
//         setFullQuizResults({video_res:resultData,pdf_res:fullQuizResults.pdf_res}),
//         setQuizResults(resultData)
//     }
//       else {setFullQuizResults({video_res:fullQuizResults.video_res,pdf_res:resultData}),
//           setQuizResults(resultData)
//     }
        
//       alert('Quiz submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       setError('An error occurred while submitting the quiz.');
//     }
//   };
  

//   const calculatePercentage = () => {
//     if (!quizResults || !quizResults.score) return 0;
//     return (quizResults.score.total_correct / quizResults.score.total_questions) * 100;
//   };

//   const percentage = calculatePercentage();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//             <BookOpen className="mr-2 h-8 w-8 text-blue-500" />
//             Bitelearn
//           </h1>
//           <nav>
//             <Button variant="ghost">About</Button>
//             <Button variant="ghost">Contact</Button>
//             <Button variant="outline">Login</Button>
//           </nav>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome to Bitelearn</h2>
//           <p className="text-lg text-gray-700 mb-8">Enhance your learning experience with our AI-powered question generation tools.</p>

//           <Tabs defaultValue="video">
//             {(activeTab, setActiveTab) => (
//               <>
//                 <TabsList>
//                 <button value="video" onClick={() => {setActive_tab("video");setQuestions(FUllquestions.video_q);setQuizResults(fullQuizResults.video_res);setUserAnswers(fulluserAns.video_ans);console.log('hello video',questions)}}>Video Questions</button>

//                 <button value="pdf"  onClick={() => {setActiveTab("pdf");setQuestions(FUllquestions.pdf_q);setQuizResults(fullQuizResults.pdf_res);setUserAnswers(fulluserAns.pdf_ans);console.log('hello pdf',questions)}}>PDF Questions</button>
//                   <TabsTrigger value="recommendations" setActiveTab={setActiveTab}>Get Recommendations</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="video" activeTab={activeTab}>
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Generate Questions from Video</CardTitle>
//                       <CardDescription>Enter a YouTube video URL to get questions and answers.</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <form onSubmit={handleVideoSubmit}>
//                         <Label htmlFor="videoUrl">YouTube Video URL</Label>
//                         <Input
//                           id="videoUrl"
//                           placeholder="https://www.youtube.com/watch?v=..."
//                           value={videoUrl}
//                           onChange={(e) => setVideoUrl(e.target.value)}
//                         />
//                         <Button type="submit" className="mt-4">Generate Questions</Button>
//                       </form>
//                     </CardContent>
//                     <CardFooter className="flex justify-between">
//                       <Button variant="outline" onClick={() => setVideoUrl('')}>Clear</Button>
//                     </CardFooter>
//                   </Card>

//                   {questions.length > 0 && (
//                     <Card className="mt-8">
//                       <CardHeader>
//                         <CardTitle>Quiz</CardTitle>
//                         <CardDescription>Answer the questions below.</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <form onSubmit={handleQuizSubmit}>
//                           {questions.map((q, index) => (
//                             <div key={index} className="mb-8 last:mb-0">
//                               <p className="font-semibold mb-3 text-lg">
//                                 {index + 1}. {q.question}
//                               </p>
//                               <RadioGroup
//                                 value={userAnswers[q.question] || ""}
//                                 onValueChange={(value) => handleAnswerChange(index, value)}
//                                 className="space-y-2"
//                               >
//                                 {q.options.map((option, optionIndex) => (
//                                   <RadioGroupItem
//                                     key={optionIndex}
//                                     value={option}
//                                     id={`question-${index}-option-${optionIndex}`}
//                                   >
//                                     {option}
//                                   </RadioGroupItem>
//                                 ))}
//                               </RadioGroup>
//                             </div>
//                           ))}
//                           <Button type="submit">Submit Quiz</Button>
//                         </form>
//                         {quizResults && (
//                           <div className="mt-8">
//                             <h3 className="text-xl font-semibold">Results</h3>
//                             <Progress value={percentage} className="mt-4">
//                               {percentage.toFixed(2)}%
//                             </Progress>
//                             {quizResults.results.map((result, index) => (
//                               <Card key={index} className="mt-4">
//                                 <CardContent>
//                                   <p className="font-semibold">
//                                     Question {index + 1}: {result.question}
//                                   </p>
//                                   <p className={`mt-1 text-sm ${result.is_correct ? 'text-green-500' : 'text-red-500'}`}>
//                                     Your answer: {result.selected_option}
//                                   </p>
//                                   {!result.is_correct && (
//                                     <p className="mt-1 text-sm text-red-500">Correct answer: {result.correct_answer}</p>
//                                   )}
//                                 </CardContent>
//                               </Card>
//                             ))}
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   )}
//                 </TabsContent>
//                 <TabsContent value="pdf" activeTab={activeTab}>
//                 <Card>
//   <CardHeader>
//     <CardTitle>Generate Questions from PDF</CardTitle>
//     <CardDescription>Upload a PDF file to get questions and answers.</CardDescription>
//   </CardHeader>
//   <CardContent>
//     <form onSubmit={handlePdfSubmit}>
//       <Label htmlFor="pdfFile">Upload PDF</Label>
//       <Input
//         type="file"
//         id="pdfFile"
//         onChange={(e) => setPdfFile(e.target.files[0])}
//       />
//       <Button type="submit" className="mt-4">Generate Questions</Button>
//     </form>
//   </CardContent>
//   <CardFooter className="flex justify-between">
//     <Button variant="outline" onClick={() => setPdfFile(null)}>Clear</Button>
//   </CardFooter>
// </Card>
// {questions.length > 0 && (
//   <Card className="mt-8">
//     <CardHeader>
//       <CardTitle>Quiz</CardTitle>
//       <CardDescription>Answer the questions below.</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <form onSubmit={handleQuizSubmit}>
//         {questions.map((q, index) => (
//           <div key={index} className="mb-8 last:mb-0">
//             <p className="font-semibold mb-3 text-lg">
//               {index + 1}. {q.question}
//             </p>
//             <RadioGroup
//               value={userAnswers[q.question] || ""}
//               onValueChange={(value) => handleAnswerChange(index, value)}
//               className="space-y-2"
//             >
//               {q.options.map((option, optionIndex) => (
//                 <RadioGroupItem
//                   key={optionIndex}
//                   value={option}
//                   id={`question-${index}-option-${optionIndex}`}
//                 >
//                   {option}
//                 </RadioGroupItem>
//               ))}
//             </RadioGroup>
//           </div>
//         ))}
//         <Button type="submit" className="mt-4">Submit Quiz</Button>
//       </form>
//       {quizResults && (
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold">Results</h3>
//           <Progress value={percentage} className="mt-4">
//             {percentage}%
//           </Progress>
//           {quizResults.results.map((result, index) => (
//             <Card key={index} className="mt-4">
//               <CardContent>
//                 <p className="font-semibold">
//                   Question {index + 1}: {result.question}
//                 </p>
//                 <p className={`mt-1 text-sm ${result.is_correct ? 'text-green-500' : 'text-red-500'}`}>
//                   Your answer: {result.selected_option}
//                 </p>
//                 {!result.is_correct && (
//                   <p className="mt-1 text-sm text-red-500">Correct answer: {result.correct_answer}</p>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </CardContent>
//   </Card>
// )}
//                 </TabsContent>
//                 <TabsContent value="recommendations" activeTab={activeTab}>
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Get Personalized Recommendations</CardTitle>
//                       <CardDescription>Enter topics of interest to get tailored recommendations.</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <form onSubmit={handleRecommendationSubmit}>
//                         <Label htmlFor="topic">Topics (comma separated)</Label>
//                         <Input
//                           id="topic"
//                           placeholder="e.g., AI, Machine Learning"
//                           value={topic}
//                           onChange={(e) => setTopic(e.target.value)}
//                         />
//                         <Button type="submit" className="mt-4">Get Recommendations</Button>
//                       </form>
//                     </CardContent>
//                     <CardFooter className="flex justify-between">
//                       <Button variant="outline" onClick={() => setTopic('')}>Clear</Button>
//                     </CardFooter>
//                   </Card>

//                   <div className="max-w-4xl mx-auto p-4">
//                     {recommendations.length > 0 && (
//                       <Card className="mt-8 bg-gradient-to-b from-blue-100 to-white">
//                         <CardHeader>
//                           <CardTitle className="text-2xl font-bold">Recommended Videos</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           <ul className="space-y-6">
//                             {recommendations.map((rec, index) => (
//                               <li 
//                                 key={index} 
//                                 className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
//                               >
//                                 <div className="p-6">
//                                   <h3 className="font-semibold text-xl mb-2 text-blue-600">{rec.title}</h3>
//                                   <p className="text-gray-600 mb-4">{rec.description}</p>
//                                   <div className="flex items-center justify-between">
//                                     <div className="flex items-center space-x-4">
//                                       <Badge variant="secondary" className="flex items-center space-x-1">
//                                         <Eye className="w-4 h-4" />
//                                         <span>{rec.views.toLocaleString()}</span>
//                                       </Badge>
//                                       <Badge variant="secondary" className="flex items-center space-x-1">
//                                         <ThumbsUp className="w-4 h-4" />
//                                         <span>{rec.likes.toLocaleString()}</span>
//                                       </Badge>
//                                     </div>
//                                     <Button asChild>
//                                       <a 
//                                         href={rec.url} 
//                                         target="_blank" 
//                                         rel="noopener noreferrer"
//                                         className="flex items-center space-x-2"
//                                       >
//                                         <span>Watch Video</span>
//                                         <ExternalLink className="w-4 h-4" />
//                                       </a>
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </li>
//                             ))}
//                           </ul>
//                         </CardContent>
//                       </Card>
//                     )}
//                   </div>
//                 </TabsContent>
//               </>
//             )}
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;
