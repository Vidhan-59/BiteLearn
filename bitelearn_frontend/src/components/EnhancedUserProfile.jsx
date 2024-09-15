// import React, { useState } from 'react'
// import { Badge } from "./ui/Badge"
// import { Card, CardContent, CardHeader, CardTitle } from "./Card"
// import  Progress  from "./ui/Progress"
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"
// import { Youtube, CheckCircle, XCircle, HelpCircle, User, Mail, Phone, Zap, Book, Trophy, Star } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"

// // Custom Tabs component with internal state management
// const TabSwitcher = ({ children }) => {
//   const [activeTab, setActiveTab] = useState('performance')

//   return (
//     <div className="space-y-4">
//       <div className="grid w-full grid-cols-2 rounded-lg bg-muted p-1">
//         <button
//           onClick={() => setActiveTab('performance')}
//           className={`rounded-md transition-all ${activeTab === 'performance' ? 'bg-primary text-white' : ''}`}
//         >
//           Performance
//         </button>
//         <button
//           onClick={() => setActiveTab('resources')}
//           className={`rounded-md transition-all ${activeTab === 'resources' ? 'bg-primary text-white' : ''}`}
//         >
//           Resources
//         </button>
//       </div>

//       {children.map((child) =>
//         React.cloneElement(child, { isActive: child.props.value === activeTab })
//       )}
//     </div>
//   )
// }

// // Custom Tab content for switching
// const TabContent = ({ value, isActive, children }) => {
//   return isActive ? <div>{children}</div> : null
// }

// export default function EnhancedUserProfile() {
//   const userData = {
//     username: "Vidhan",
//     email: "vidhanshah59@gmail.com",
//     contact_number: "1234432184",
//     is_verified: true,
//     video_request_count: 2,
//     video_urls: [
//       "https://www.youtube.com/watch?v=3QhU9jd03a0",
//       "https://www.youtube.com/watch?v=AEaKrq3SpW8"
//     ],
//     score_data: {
//       user: "66d6a34d941464b96bb8c752",
//       total_correct_answer: "11",
//       total_wrong_answer: "0",
//       total_unattempted_question: "0",
//       total_question: "11"
//     }
//   }

//   const scoreData = [
//     { name: "Correct", value: parseInt(userData.score_data.total_correct_answer) },
//     { name: "Wrong", value: parseInt(userData.score_data.total_wrong_answer) },
//     { name: "Unattempted", value: parseInt(userData.score_data.total_unattempted_question) },
//   ]

//   const COLORS = ["#10B981", "#EF4444", "#F59E0B"]

//   const progressData = [
//     { name: 'Completed', value: parseInt(userData.score_data.total_correct_answer) },
//     { name: 'Remaining', value: parseInt(userData.score_data.total_question) - parseInt(userData.score_data.total_correct_answer) },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <Card className="overflow-hidden shadow-lg">
//           <div className="md:flex">
//             <div className="md:shrink-0 bg-gradient-to-br from-primary to-primary-foreground p-6 text-white">
//               <Avatar className="w-32 h-32 mx-auto md:mx-0 border-4 border-white shadow-xl">
//                 <AvatarImage src="/placeholder.svg" alt={userData.username} />
//                 <AvatarFallback className="text-4xl">{userData.username.charAt(0).toUpperCase()}</AvatarFallback>
//               </Avatar>
//             </div>
//             <div className="p-8">
//               <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-1">User Profile</div>
//               <h1 className="text-3xl font-bold flex items-center mb-2">
//                 {userData.username}
//                 {userData.is_verified && (
//                   <Badge variant="secondary" className="ml-2">
//                     Verified
//                   </Badge>
//                 )}
//               </h1>
//               <p className="text-muted-foreground flex items-center mb-1">
//                 <Mail className="mr-2 h-4 w-4" /> {userData.email}
//               </p>
//               <p className="text-muted-foreground flex items-center">
//                 <Phone className="mr-2 h-4 w-4" /> {userData.contact_number}
//               </p>
//             </div>
//           </div>
//         </Card>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
//               <Book className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{userData.score_data.total_question}</div>
//               <p className="text-xs text-muted-foreground">Questions in your learning path</p>
//             </CardContent>
//           </Card>
//           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Correct Answers</CardTitle>
//               <CheckCircle className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{userData.score_data.total_correct_answer}</div>
//               <p className="text-xs text-muted-foreground">Questions answered correctly</p>
//             </CardContent>
//           </Card>
//           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
//               <Zap className="h-4 w-4 text-yellow-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {((parseInt(userData.score_data.total_correct_answer) / parseInt(userData.score_data.total_question)) * 100).toFixed(1)}%
//               </div>
//               <p className="text-xs text-muted-foreground">Overall accuracy rate</p>
//             </CardContent>
//           </Card>
//         </div>

//         <TabSwitcher>
//           <TabContent value="performance">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold flex items-center">
//                     <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
//                     Quiz Performance
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex flex-col items-center">
//                   <div className="w-full h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={scoreData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={60}
//                           outerRadius={80}
//                           fill="#8884d8"
//                           paddingAngle={5}
//                           dataKey="value"
//                         >
//                           {scoreData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold flex items-center">
//                     <Star className="mr-2 h-5 w-5 text-blue-500" />
//                     Learning Progress
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <BarChart data={progressData}>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="#8884d8" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                   <div className="mt-4">
//                     <div className="flex justify-between mb-1">
//                       <span className="text-sm font-medium">Completion Rate</span>
//                       <span className="text-sm font-medium">
//                         {((parseInt(userData.score_data.total_correct_answer) / parseInt(userData.score_data.total_question)) * 100).toFixed(1)}%
//                       </span>
//                     </div>
//                     <Progress
//                       value={(parseInt(userData.score_data.total_correct_answer) / parseInt(userData.score_data.total_question)) * 100}
//                       className="h-2"
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabContent>

//           <TabContent value="resources">
//             <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold flex items-center">
//                   <Youtube className="mr-2 h-5 w-5 text-red-500" />
//                   Video Resources
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-3">
//                   {userData.video_urls.map((url, index) => (
//                     <li key={index} className="flex items-center bg-secondary rounded-lg p-4 hover:bg-secondary/80 transition-colors duration-200">
//                       <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-3">
//                         {index + 1}
//                       </div>
//                       <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex-1">
//                         Video {index + 1}
//                       </a>
//                       <Badge variant="outline" className="ml-2">Watched</Badge>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//           </TabContent>
//         </TabSwitcher>
//       </div>
//     </div>
//   )
// }




// import React, { useState, useEffect } from 'react'
// import { Badge } from "./ui/Badge"
// import { Card, CardContent, CardHeader, CardTitle } from "./Card"
// import Progress from "./ui/Progress"
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"
// import { Youtube, CheckCircle, XCircle, HelpCircle, User, Mail, Phone, Zap, Book, Trophy, Star } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
// import Cookies from 'js-cookie';
// // Custom Tabs component with internal state management
// const TabSwitcher = ({ children }) => {
//   const [activeTab, setActiveTab] = useState('performance')

//   return (
//     <div className="space-y-4">
//       <div className="grid w-full grid-cols-2 rounded-lg bg-muted p-1">
//         <button
//           onClick={() => setActiveTab('performance')}
//           className={`rounded-md transition-all ${activeTab === 'performance' ? 'bg-primary text-white' : ''}`}
//         >
//           Performance
//         </button>
//         <button
//           onClick={() => setActiveTab('resources')}
//           className={`rounded-md transition-all ${activeTab === 'resources' ? 'bg-primary text-white' : ''}`}
//         >
//           Resources
//         </button>
//       </div>

//       {children.map((child) =>
//         React.cloneElement(child, { isActive: child.props.value === activeTab })
//       )}
//     </div>
//   )
// }

// // Custom Tab content for switching
// const TabContent = ({ value, isActive, children }) => {
//   return isActive ? <div>{children}</div> : null
// }

// export default function EnhancedUserProfile() {
//   const [userData, setUserData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = Cookies.get('auth_token');
//         if (!token) {
//         setError("You are not allowed to access this page. Redirecting to signup...");
//         setTimeout(() => {
//           navigate("/signup"); // Redirect after 2 seconds
//         }, 2000);
//         return;
//     }
//         const response = await fetch('http://localhost:8000/api/progress/', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`
//             },
//           });
//         if (!response.ok) {
//           throw new Error('Network response was not ok')
//         }
//         const data = await response.json()
//         setUserData(data)
//         console.log(data)
//       } catch (error) {
//         setError(error.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserData()
//   }, [])

//   if (loading) return <div>Loading...</div>
//   if (error) return <div>Error: {error}</div>
//   if (!userData) return <div>No data available</div>

//   const scoreData = [
//     { name: "Correct", value: parseInt(userData.score_data.total_correct_answer) },
//     { name: "Wrong", value: parseInt(userData.score_data.total_wrong_answer) },
//     { name: "Unattempted", value: parseInt(userData.score_data.total_unattempted_question) },
//   ]

//   const COLORS = ["#10B981", "#EF4444", "#F59E0B"]

//   const progressData = [
//     { name: 'Completed', value: parseInt(userData.score_data.total_correct_answer) },
//     { name: 'Remaining', value: parseInt(userData.score_data.total_question) - parseInt(userData.score_data.total_correct_answer) },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <Card className="overflow-hidden shadow-lg">
//           <div className="md:flex">
//             <div className="md:shrink-0 bg-gradient-to-br from-primary to-primary-foreground p-6 text-white">
//               <Avatar className="w-32 h-32 mx-auto md:mx-0 border-4 border-white shadow-xl">
//                 <AvatarImage src="/placeholder.svg" alt={userData.username} />
//                 <AvatarFallback className="text-4xl">{userData.username.charAt(0).toUpperCase()}</AvatarFallback>
//               </Avatar>
//             </div>
//             <div className="p-8">
//               <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-1">User Profile</div>
//               <h1 className="text-3xl font-bold flex items-center mb-2">
//                 {userData.username}
//                 {userData.is_verified && (
//                   <Badge variant="secondary" className="ml-2">
//                     Verified
//                   </Badge>
//                 )}
//               </h1>
//               <p className="text-muted-foreground flex items-center mb-1">
//                 <Mail className="mr-2 h-4 w-4" /> {userData.email}
//               </p>
//               <p className="text-muted-foreground flex items-center">
//                 <Phone className="mr-2 h-4 w-4" /> {userData.contact_number}
//               </p>
//             </div>
//           </div>
//         </Card>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
//               <Book className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{userData.score_data.total_question}</div>
//               <p className="text-xs text-muted-foreground">Questions in your learning path</p>
//             </CardContent>
//           </Card>
//           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Correct Answers</CardTitle>
//               <CheckCircle className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{userData.score_data.total_correct_answer}</div>
//               <p className="text-xs text-muted-foreground">Questions answered correctly</p>
//             </CardContent>
//           </Card>
//           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
//               <Zap className="h-4 w-4 text-yellow-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {((parseInt(userData.score_data.total_correct_answer) / parseInt(userData.score_data.total_question)) * 100).toFixed(1)}%
//               </div>
//               <p className="text-xs text-muted-foreground">Overall accuracy rate</p>
//             </CardContent>
//           </Card>
//         </div>

//         <TabSwitcher>
//           <TabContent value="performance">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold flex items-center">
//                     <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
//                     Quiz Performance
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex flex-col items-center">
//                   <div className="w-full h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={scoreData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={60}
//                           outerRadius={80}
//                           fill="#8884d8"
//                           paddingAngle={5}
//                           dataKey="value"
//                         >
//                           {scoreData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold flex items-center">
//                     <Star className="mr-2 h-5 w-5 text-blue-500" />
//                     Learning Progress
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <BarChart data={progressData}>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="#82ca9d" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabContent>
//           <TabContent value="resources">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold flex items-center">
//                     <Youtube className="mr-2 h-5 w-5 text-red-500" />
//                     YouTube Resources
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {/* Implement the YouTube resources section */}
//                 </CardContent>
//               </Card>
//               <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold flex items-center">
//                     <HelpCircle className="mr-2 h-5 w-5 text-green-500" />
//                     Helpful Resources
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {/* Implement the helpful resources section */}
//                 </CardContent>
//               </Card>
//             </div>
//           </TabContent>
//         </TabSwitcher>
//       </div>
//     </div>
//   )
// }
















import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { Badge } from './ui/Badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { Youtube, CheckCircle, Zap, Book, Trophy, Star, FileText, Mail, Phone } from 'lucide-react'
import  IconUserGraduate  from './ui/usericon'
const TabSwitcher = ({ children }) => {
  const [activeTab, setActiveTab] = useState('performance')

  return (
    <div className="space-y-4">
      <div className="grid w-full grid-cols-3 rounded-lg bg-muted p-1">
        <button
          onClick={() => setActiveTab('performance')}
          className={`rounded-md transition-all ${activeTab === 'performance' ? 'bg-primary text-white' : ''}`}
        >
          Performance
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`rounded-md transition-all ${activeTab === 'progress' ? 'bg-primary text-white' : ''}`}
        >
          Progress
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`rounded-md transition-all ${activeTab === 'resources' ? 'bg-primary text-white' : ''}`}
        >
          Resources
        </button>
      </div>

      {children.map((child) =>
        React.cloneElement(child, { isActive: child.props.value === activeTab })
      )}
    </div>
  )
}

const TabContent = ({ value, isActive, children }) => {
  return isActive ? <div>{children}</div> : null
}

export default function EnhancedUserProfile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    contact_number: '',
    is_verified: false,
    video_request_count: 0,
    video_urls: [],
    pdf_request_count: 0,
    score_data: {
      total_correct_answer: '0',
      total_wrong_answer: '0',
      total_unattempted_question: '0',
      total_question: '0'
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('auth_token')
        if (!token) {
          setError("You are not allowed to access this page. Redirecting to signup...")
          setTimeout(() => {
            navigate('/signup') // Redirect after 2 seconds
          }, 2000)
          return
        }

        const response = await fetch('http://localhost:8000/api/progress/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setUserData({
          ...data,
          video_urls: data.video_urls || [],
          pdf_request_count: data.pdf_request_count || 0
        })
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const scoreData = [
    { name: "Correct", value: parseInt(userData.score_data.total_correct_answer) },
    { name: "Wrong", value: parseInt(userData.score_data.total_wrong_answer) },
    { name: "Unattempted", value: parseInt(userData.score_data.total_unattempted_question) },
  ]

  const COLORS = ["#10B981", "#EF4444", "#F59E0B"]

  const progressData = [
    { name: 'Correct', value: parseInt(userData.score_data.total_correct_answer) },
    { name: 'Incorrect/Unattempted', value: parseInt(userData.score_data.total_question) - parseInt(userData.score_data.total_correct_answer) },
  ]

  const radarData = [
    { subject: 'Correct Answers', A: parseInt(userData.score_data.total_correct_answer), fullMark: parseInt(userData.score_data.total_question) },
    { subject: 'Wrong Answers', A: parseInt(userData.score_data.total_wrong_answer), fullMark: parseInt(userData.score_data.total_question) },
    { subject: 'Unattempted', A: parseInt(userData.score_data.total_unattempted_question), fullMark: parseInt(userData.score_data.total_question) },
    { subject: 'Video Requests', A: userData.video_request_count, fullMark: 5 },
    { subject: 'PDF Requests', A: userData.pdf_request_count, fullMark: 5 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
    <div className="max-w-7xl mx-auto space-y-8">
      <Card className="overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:shrink-0 bg-gradient-to-br from-primary to-primary-foreground p-6 text-white flex items-center justify-center">
            <div className="w-32 h-32 flex items-center justify-center border-4 border-white shadow-xl">
              <IconUserGraduate className="w-20 h-20 text-white" />
            </div>
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-1">User Profile</div>
            <h1 className="text-3xl font-bold flex items-center mb-2">
              {userData.username}
              {userData.is_verified && (
                <Badge variant="secondary" className="ml-2">
                  Verified
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground flex items-center mb-1">
              <Mail className="mr-2 h-4 w-4" /> {userData.email}
            </p>
            <p className="text-muted-foreground flex items-center">
              <Phone className="mr-2 h-4 w-4" /> {userData.contact_number}
            </p>
          </div>
        </div>
      </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              <Book className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.score_data.total_question}</div>
              <p className="text-xs text-muted-foreground">Questions in your learning path</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Correct Answers</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.score_data.total_correct_answer}</div>
              <p className="text-xs text-muted-foreground">Questions answered correctly</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((parseInt(userData.score_data.total_correct_answer) / parseInt(userData.score_data.total_question)) * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Overall accuracy rate</p>
            </CardContent>
          </Card>
        </div>

        <TabSwitcher>
          <TabContent value="performance" isActive={true}>
            <div className="h-80">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Trophy className="h-6 w-6 mr-2" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={scoreData}
                          dataKey="value"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        >
                          {scoreData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="pt-4">
              <div className="font-semibold text-lg">Video Requests: {userData.video_request_count}</div>
              <div className="font-semibold text-lg">PDF Requests: {userData.pdf_request_count}</div>
            </div>
          </TabContent>
          <TabContent value="progress" isActive={false}>
            <div className="h-80">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Star className="h-6 w-6 mr-2" />
                    Progress Chart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer>
                      <BarChart data={progressData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="pt-4">
              <div className="font-semibold text-lg">Video Requests: {userData.video_request_count}</div>
              <div className="font-semibold text-lg">PDF Requests: {userData.pdf_request_count}</div>
            </div>
          </TabContent>
          
         
          <TabContent value="resources" isActive={false}>
            <div className="space-y-4">
              {userData.video_urls.map((url, index) => (
                <div key={index} className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
                  <Youtube className="h-6 w-6 text-red-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-lg truncate">{url}</div>
                    <p className="text-sm text-muted-foreground">Video Request {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabContent>
        </TabSwitcher>
      </div>
    </div>
  )
}
