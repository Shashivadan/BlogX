

import React from 'react'
import type { Metadata } from 'next';
import PageHeader from '@/components/page-headers';
import { getCurrentUser } from '@/lib/get-current-user';
import { redirect } from 'next/navigation';
import SettingsForm from '@/components/setting-form';
import SettingsDeleteAccount from '@/components/settings-delete-account';


const title = "Settings";
const description = "Manage your account settings";

export const metadata: Metadata = {
  title,
  description,
};



export default async function page() {
  const user = await getCurrentUser()

  if(!user){
    redirect("/login?redirect=/me/settings")
  }
  return (

    <div >
    <PageHeader title={title} description={description}/>
    <div className='my-8 space-y-4'>
      <SettingsForm user={user}/>
      <SettingsDeleteAccount/>
    </div>
    </div>
  )
}
