import { getDocumentById } from '@/lib/firebase/firebaseControllers'
import { useLoading } from "@/components/loading/loadingProvider"
import Experience from '@/components/ui/Experience'


/**const experiences = [
  {
    id: "0rrWIItwx8ZQFi1Bfm5u",
    imageUrl: "/images/sahara.jpg",
    title: "Sahara Desert Tour",
    description: "Embark on an unforgettable journey through the golden dunes of the Sahara. Our expert guides will lead you on a 3-day adventure, where you'll ride camels, sleep under the stars, and explore ancient oases.",
    price: 199,
    city: "Douz",
    geoPoint: [33.4667, 9.0167],
    date: "2024-08-15",
    capacity: 12,
    includes: ["Camel ride", "Camping equipment", "Meals", "Local guide"],
    meetingPoint: "Douz, Tunisia",
    guides:[
      {id:"0",username:"Farhat",email:"farhat@gmail.com",role:"Lead Guide",avatar:"/images/user.jpg",},
      {id:"1",username:"Nouha",email:"oussema@gmail.com",role:"Assistant Guide",avatar:"/images/woman2.jpg",},
    ]
  },
]**/

function convertToPlainObject(obj) {
  if (obj && typeof obj === 'object') {
    if (obj.toDate instanceof Function) {
      // Convert Firestore Timestamp to ISO string
      return obj.toDate().toISOString();
    }
    if (obj._lat !== undefined && obj._long !== undefined) {
      // Convert Firestore GeoPoint to a plain object
      return { lat: obj._lat, long: obj._long };
    }
    // Recursively convert nested objects and arrays
    return Object.keys(obj).reduce((result, key) => {
      result[key] = convertToPlainObject(obj[key]);
      return result;
    }, Array.isArray(obj) ? [] : {});
  }
  return obj;
}



export default async function ExperienceDetails({ params }: { params: { id: string } }) {
  const { id } = params

  try {
    let experience = await getDocumentById("trips", id)
    experience = convertToPlainObject(experience);
    console.log(experience)

    if (!experience) {
      return <div>Experience not found!</div>
    }

    return <Experience experience={experience} />
  } catch (error) {
    console.error('Failed to fetch experience:', error)
    return <div>Failed to load experience. Please try again later.</div>
  }
}