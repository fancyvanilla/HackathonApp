import { getDocumentById,getMultipleDocuments } from '@/lib/firebase/firebaseControllers'
import { useLoading } from "@/components/loading/loadingProvider"
import Experience from '@/components/ui/Experience'

//TODO: fix types

interface FirestoreTimestamp {
  toDate: () => Date;
}

interface FirestoreGeoPoint {
  _lat: number;
  _long: number;
}

type FirestoreData = string | number | boolean | FirestoreTimestamp | FirestoreGeoPoint | { [key: string]: FirestoreData } | FirestoreData[];


function convertToPlainObject(obj: any): any {
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
    return Object.keys(obj).reduce((result: any, key: string) => {
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

    if (!experience) {
      return <div>Experience not found!</div>
    }

    // Fetch guides in a single batch request
    const guidesIds = experience?.guides || []
    let guides = []
    if (guidesIds.length > 0) {
      guides = await getMultipleDocuments("users", guidesIds)
      guides = guides
        .filter(guide => guide.role === "guide")
        .map(convertToPlainObject)
    }

    return <Experience experience={experience} guides={guides} />
  } catch (error) {
    console.error('Failed to fetch experience:', error)
    return <div>Failed to load experience. Please try again later.</div>
  }
}