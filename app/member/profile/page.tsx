import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { MemberState, PositionCategory } from '@/types/interface'
import { getPositionCategories, getProfile } from '@/app/utils/featuresApi'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import UpdateProfile from './updateProfile'
import Image from 'next/image'

const MemberProfile = async () => {
  const session = await getServerSession(authOptions);
  const profile: MemberState = await getProfile(session?.user.accessToken)
  const positionCategories: PositionCategory[] = await getPositionCategories(session?.user.accessToken);

  return (
    <>
      <div className="w-full block md:flex items-start justify-start gap-5 flex-wrap">
        <div className="w-full md:w-80 bg-white rounded p-4 border border-solid shadow mb-5 md:mb-0">
          <div className="w-full flex justify-center text-center mb-8">
            <img className='w-24 h-24 rounded-full object-cover border border-solid border-blue-400' src={`${profile.imageProfile}`} alt="image profile" />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-4 mb-5">
            <div className="flex flex-col text-sm gap-1 w-full">
              <span className='text-gray-500'>Username :</span>
              <span className='font-bold flex-1'>{profile.username}</span>
            </div>
            <div className="flex flex-col text-sm gap-1 w-full">
              <span className='text-gray-500'>Email :</span>
              <span className='font-bold flex-1'>{profile.email}</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className=" bg-white rounded p-4 border border-solid shadow mb-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <Label>Nama Lengkap</Label>
                <Input value={profile.name} readOnly className='font-bold' />
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <Label>Alamat</Label>
                <Input value={profile.address} readOnly className='font-bold' />
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <Label>No Telepon</Label>
                <Input value={profile.phone_number} readOnly className='font-bold' />
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <Label>Jenis Kelamin</Label>
                <Input value={profile.gender == 'P' ? 'Perempuan' : 'Laki-laki'} readOnly className='font-bold' />
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <Label>Agama</Label>
                <Input value={profile.religion} readOnly className='font-bold' />
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <Label>Jabatan</Label>
                <Input value={profile.position.toUpperCase()} readOnly className='font-bold' />
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <Label>Golongan</Label>
                <Input value={profile.position_category} readOnly className='font-bold' />
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <Label>Waktu Bergabung</Label>
                <Input value={profile.date_activation} readOnly className='font-bold' />
              </div>
            </div>
          </div>
          <UpdateProfile member={profile} dataPositions={positionCategories} />
        </div>

      </div>
    </>
  )
}

export default MemberProfile