export interface CourseTask {
  id: string;
  title: string;
  completed: boolean;
  breakdown?: Array<{
    phase: string;
    duration: string;
    color: string;
  }>;
}

export interface Course {
  id: string;
  title: string;
  professor: {
    name: string;
    title: string;
    avatar: string;
    email: string;
  };
  location: string;
  time: {
    start: string;
    end: string;
    day: string;
  };
  color: string;
  students: Array<{
    name: string;
    avatar: string;
    match?: number;
    tag?: string;
    subtitle?: string;
  }>;
  tasks: CourseTask[];
  roomChangeAlert?: {
    message: string;
    acknowledged: boolean;
  };
  mapImage: string;
  tags: string[];
  examDate?: string;
  type?: string; // Lecture, Seminar, Lab, etc.
}

export const COURSES: Course[] = [
  {
    id: "advanced-psychology",
    title: "Advanced Psychology",
    professor: {
      name: "Dr. Sarah Jenkins",
      title: "Head of Department",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5JoD5sWSEiMgL6BMq0tsLznwfrbE2a0jEShwneKTkqT5ykWAYEFGdJ7cnQ1qw2X6Vm2exMe4aBlnddJgYurknPDddHAlSlH-QSZIQ9VXa_dQmgSO3UYZcRQup2q1XcDHiYnLeXkCsN4JamldMBb3-fjQvW1LfKSuAwLLDOOsbe6Ao_oUR6uAWF2u4beOzBPFY4-gwAiM62Sto3uBBqrVENgg46rALfuJM-QzxDXI1mS7e_epkm3t6HFcjZCDv7tA5ulXH61pzhY0",
      email: "sarah.jenkins@university.edu",
    },
    location: "Building B, Room 405",
    time: {
      start: "10:00 AM",
      end: "11:30 AM",
      day: "Monday",
    },
    color: "indigo",
    students: [
      {
        name: "Sarah M.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcoJ1TCwG5s-zMwwXgInfywfpB0dAHwrpHieJ8NZFY4bwBSpvDsEFeLKUw9JlaD8PRYFr9R5GUnPtC08zAo6WgVN1RCVruLhmi-EYRqWsiG13Dd_gkVNLlv8tdIeP9MrPtG4zs_kWNVUMa7y-Ps1WiYYZ7KpRtin758sFb6K1JZEy-uXCyJCos8Mnfbx32odsg74kxhwqRDVCjzy0H239GaNFBYtiaNwqzbnEOQ3Qmav0fMrqfXJbna22kJa1XQ5Tq_Hy16NfrICg",
        match: 95,
        tag: "✨ Team Suggestion",
        subtitle: "Complementary: UX",
      },
      {
        name: "David K.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuKU5njVVHlHDJFdYfXFlO5GS5OUkFTYZ-mFf_ByXP9qyhLzxu3UR8kUWQ-nij2ieqQxTPTds9K7LTSdRCw8imoJuOpdv621PrjU8YxqkcNbWAVamB71vJkGMAALtLM-3Zn7RImTjRVueKiBWB5fVpAcx9JHnTds6InqQS41rJXW0WNPA4g5f8fXb8bfbhWnw9iPfCuFxfldfdC53Iw32r98ecVTRk7jtWfLy9guPLkes_pLs34zkm3j0OUPvy_jdi625QUDBj2VI",
        tag: "🏠 Neighbor",
        subtitle: "North Dorms",
      },
    ],
    tasks: [
      {
        id: "task-1",
        title: "Read Chapter 4: Neural Networks",
        completed: true,
      },
      {
        id: "task-2",
        title: "Final Paper: Cognitive Models",
        completed: false,
        breakdown: [
          { phase: "Research Phase", duration: "2h", color: "indigo" },
          { phase: "Detailed Outline", duration: "45m", color: "purple" },
          { phase: "First Draft", duration: "3h", color: "pink" },
        ],
      },
    ],
    roomChangeAlert: {
      message: "Room Changed to Building B, Room 405",
      acknowledged: false,
    },
    mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuaylQUZnsIlv5GIVPwhhPe03szzH2O80oHYxGquSJMDhQZQrvDqLQQqz0Biz1TcgcPqhsari1TJW4EMe_ROB7WSU-q5QRYg1eeI2Gjq55CnZsYkJ8zXlIlMqx7_PXL5oj1UMKY0stRKj_FQJ9r0U5f24JTgYlpnieqGBQVBHqB9oveD64_36l0Uq6DtFQx9HnJzik7Led_n8koXaf3i5ua3x_DocUNkdQV_38eyokb7aSDpxgs78lmLiXdrM7ukVm-YZorsMGbPg",
    tags: ["Cognitive Science", "Behavioral Analysis"],
    examDate: "Dec 12",
    type: "Lecture",
  },
  {
    id: "cs-101",
    title: "Computer Science 101",
    professor: {
      name: "Prof. Alan Grant",
      title: "Professor",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoYUYWzjaimkgnR6_eDlLikk4RvlcD2DMsLvz_A-h1BnZWlTlMIctb3f-20Xr8KGxTVeeFEfdudyD5YoVXQrJTQCFHTIfNLYGf6_2ZoXwxsqtSUtlQMxAqLS7C8Bpx7wLhuZS9K-EkAtNDNGww0kdgvnuDEKPRNDX3EYPOrK5Ei7gTZGtWV7-O2cJKk3k8GBS0jom2aPhW44xv0Dc2XQv26kWvNCEcOXBkYVSjymXPf5Polw5N3RGHtg2d5Ex1-pRwHsXdT20o9bI",
      email: "alan.grant@university.edu",
    },
    location: "Room 304, Science Block",
    time: {
      start: "10:00 AM",
      end: "11:30 AM",
      day: "Wednesday",
    },
    color: "blue",
    students: [
      {
        name: "Alex T.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyz-7fG_3mUuQFOFGy59g_E63LuBtBT-myZPqlJYwcc61j-R3rYLTwhY9w_b3Euki3eN6oU_8ZmEUD0YkE4hxG8iTnbgePB87j-lYuimB5xE2eWKFDd_uZ2N18vEKB5nffyHmpma1tTYvvvlHIGGJ1tQq7cHBWxzzrKW6MOk5fjhFEn1yprlNT4PXsWhnh98GMk7u8D9nQ1ZD50UTc_ou0jWIKLLYjNRCyOPpg54KuRLyUjQQW4dL_06KH7jvU7Tk3SFWr6U4Jpmg",
        match: 88,
        tag: "Study Buddy",
        subtitle: "Same Dorm",
      },
      {
        name: "Jordan L.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1ddfohV_5YxQSv7BrSOLZFc7srayNRYKGs0HKXdnMIAuWuBpgYsE57wUtOf3XWkZpPXU9wsdPKvn_24Us1NEz6S976x4w3G0RDtB6267791MZRg86h2sHblLFFsbBkcY-DWpi_r-1gT8_gYFJJLl14vb2mtZPfNWGM2fOd8hQX9_HADZ481iqgUySq_HCX7-DhfyI81JQSBnCqrA4yzzGNJbBL3WuWCXmDEYFG8zH9vGWKAoDi6FLpMsx5A2_MD5ygorJWJyontQ",
        tag: "Lab Partner",
        subtitle: "CS Major",
      },
    ],
    tasks: [
      {
        id: "cs-task-1",
        title: "Submit PDF Assignment",
        completed: false,
      },
      {
        id: "cs-task-2",
        title: "Complete Lab Exercise 3",
        completed: false,
      },
    ],
    mapImage: "https://via.placeholder.com/400x200",
    tags: ["Programming", "Algorithms"],
    type: "Lecture",
  },
  {
    id: "history-of-art",
    title: "History of Art",
    professor: {
      name: "Prof. Rivera",
      title: "Associate Professor",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP3VWgfGl63LDNPS0uReLqf3a8d3w_VCnFhtaD-5vBOCZMZINtTLJpckx1XkqkIZddIFJanPy19Vv6v2rFjZ9_NDj4DBtKhcayyqFSiX25mjL2j2aiz28aYM7qQ-LaOIcI01W2u3xYMmpxm4_1ken_NR1H3RD0XapEdcz82D1PuTz1uWNdpwkXJskv8ZCf5Rd3zfBJCUi4rbaPmD9ZoqosE-glZb4p3_aoNptTM9QWXClFSGAIm7r7hlAIToGvAopRmUAz6Qy1uAc",
      email: "rivera@university.edu",
    },
    location: "Hall B",
    time: {
      start: "2:30 PM",
      end: "4:00 PM",
      day: "Wednesday",
    },
    color: "indigo",
    students: [
      {
        name: "Maya R.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe3i2a39k14iCT7KehVBG8GjyAsJPLvgFpSnrnOmrd9fZl1cjYJ3pLto7dnpsTOPo3ALvOzUVVnMKY4MAIkHj7wVRlyA8OcXDTZu6iovhiKsXYNmt23wJzZT_WCXLY9W-6X5tUpbw1Rsh1ai901ZR5gCwZzQsX7Jao7zFfMUvdVS9udiNsFT3G0386Yf7zSIlwRb0mD3MULSA5oV6B-Q4-F54p-u17d6QUad-Uzczz2NrTYHYX9VxJz80ZznWJZMa3FntNSsFcR4A",
        match: 92,
        tag: "Art Enthusiast",
        subtitle: "Studio Arts",
      },
    ],
    tasks: [
      {
        id: "art-task-1",
        title: "Review Renaissance Period",
        completed: true,
      },
    ],
    mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe3i2a39k14iCT7KehVBG8GjyAsJPLvgFpSnrnOmrd9fZl1cjYJ3pLto7dnpsTOPo3ALvOzUVVnMKY4MAIkHj7wVRlyA8OcXDTZu6iovhiKsXYNmt23wJzZT_WCXLY9W-6X5tUpbw1Rsh1ai901ZR5gCwZzQsX7Jao7zFfMUvdVS9udiNsFT3G0386Yf7zSIlwRb0mD3MULSA5oV6B-Q4-F54p-u17d6QUad-Uzczz2NrTYHYX9VxJz80ZznWJZMa3FntNSsFcR4A",
    tags: ["Art History", "Renaissance"],
    type: "Seminar",
  },
  {
    id: "calculus-i",
    title: "Calculus I",
    professor: {
      name: "Prof. Smith",
      title: "Professor",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1FfK5bAJhgZQq1F90Tq48rOstm895oz3B_OWiVCPsPttXlQrxouI2rubAI8gsZ-D_oNNOYez2fdEHr3gfIAs5iPVgZF_SGpVF-_dycY7aeA0i7Dz-foh7bVM52-MoJBqraNS27f8aCtkpb3sB5bLEq1I-m-3PwsqeJzvos6mmcGGoi64DDIm6mrnPN6feYLK8RR3bOv2r6nLEIqwSnvLTZpz7ndgy15X8Jcb7lr_0c_hnjaeAQXFBEIWg7LoymPAu-mxQAJvBhGg",
      email: "smith@university.edu",
    },
    location: "Room 201",
    time: {
      start: "8:00 AM",
      end: "9:30 AM",
      day: "Monday",
    },
    color: "blue",
    students: [
      {
        name: "Chris P.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcoJ1TCwG5s-zMwwXgInfywfpB0dAHwrpHieJ8NZFY4bwBSpvDsEFeLKUw9JlaD8PRYFr9R5GUnPtC08zAo6WgVN1RCVruLhmi-EYRqWsiG13Dd_gkVNLlv8tdIeP9MrPtG4zs_kWNVUMa7y-Ps1WiYYZ7KpRtin758sFb6K1JZEy-uXCyJCos8Mnfbx32odsg74kxhwqRDVCjzy0H239GaNFBYtiaNwqzbnEOQ3Qmav0fMrqfXJbna22kJa1XQ5Tq_Hy16NfrICg",
        match: 90,
        tag: "Math Whiz",
        subtitle: "Engineering",
      },
    ],
    tasks: [
      {
        id: "calc-task-1",
        title: "Complete Problem Set 5",
        completed: false,
      },
    ],
    mapImage: "https://via.placeholder.com/400x200",
    tags: ["Mathematics", "Calculus"],
    type: "Lecture",
  },
];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((course) => course.id === id);
}

