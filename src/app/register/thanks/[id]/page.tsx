import React from 'react';
import { getDocumentById } from '@/lib/firebase/firebaseControllers';
 import Thanks from '@/components/ui/Thanks'

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;


  try {
    let user = await getDocumentById("users", id);

    if (!user) {
      return <div>User not found! Please try again later.</div>;
    }

    return (
      <Thanks user={user}/>
    );

  } catch (error) {
    console.error('Failed to fetch user:', error);
    return <div>Failed to load the experience. Please try again later.</div>;
  }
};

export default Page;
