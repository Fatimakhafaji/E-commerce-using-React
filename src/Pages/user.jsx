import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../baseUrl'
import { email, map } from 'zod/v4'
import { Form } from 'react-hook-form'

export default function User() {
    const [user , setUser] = useState([])
    const [form ,setForm] = useState({username:"",email:""})
    const [loading , setLoading] = useState(false)
    const [editingId, setEditingID] =useState(null)
    const [showModelEdit, setShowModelEdit] = useState(false)

    
    //get users
    useEffect(()=>{
        const fetchUsers = async () =>{
            setLoading(true)
            try {
                const res = await axios.get(`${baseUrl}/users`)
                setUser(res.data)
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }
        }
        fetchUsers();
    },[])

    //delete
    const deleteUser = async(id)=>{
        setLoading(true)
        try {
            await axios.delete(`${baseUrl}/users/${id}`)
            setUser(user.filter((u)=> u.id !== id))
            alert('Delete User Done')
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    //update
    const updateUsers = async()=>{
        setLoading(true)
        try {
            const res = await axios.put(`${baseUrl}/users/${editingId}` , form)
            const updateUser = {...form , id:editingId}
            setUser(user.map((u)=>(u.id === editingId ? updateUser : u)))
            setForm({username :"" , email :""})
            setShowModelEdit(false)
            alert('update user Done')
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    //add user
    const adduser = async ()=>{
        setLoading(true)
        try {
            setLoading(true)
            const res= axios.post(`${baseUrl}/users`,form)
            const newUsers ={...form ,id:
                (await res).data.id || Date.now()
            }
            setUser([...user,newUsers])
            setForm({username:"",email:""})
            alert("add new user Done")
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className=''>

        <input type="text" 
        placeholder='name'
        value={form.username}
        onChange={(e) => setForm({...form , username: e.target.value})}
        className='block border border-black p-1.5 w-[60%] mx-auto mb-3 rounded'
        />
         <input type="text" 
        placeholder='email'
        value={form.email}
        onChange={(e) => setForm({...form , email: e.target.value})}
        className='block border border-black p-1.5 w-[60%] mx-auto mb-3 rounded'
        />

        <button onClick={adduser} className='bg-green-700 text-white p-2.5 block mx-auto rounded cursor-pointer'>add</button>
        <div className='mx-auto flex flex-col justify-center my-3.5 max-w-[60%]'>
            {user.map((user)=>{
            return <div key={user.id} className='flex border p-3.5 my-2.5 rounded-2xl justify-between items-center'>
                <div className='flex flex-col gap-1'>
                    <h2>{user.username}</h2>
                    <h2>{user.email}</h2>
                </div>
                <div className='flex flex-col gap-1'>
                   <button
                    onClick={()=>{
                        setShowModelEdit(true)
                        setEditingID(user.id)
                        setForm({username : user.username , email:user.email})
                    }}
                    className='bg-orange-400 text-white p-2.5 rounded cursor-pointer'>edit</button>
                   <button onClick={()=>deleteUser(user.id)} className='bg-blue-400 text-white p-2.5 rounded cursor-pointer'>delete</button>
                </div>
            </div>
        })}
        </div>
        

        {showModelEdit && (
            <div className='fixed top-[50%] left-[50%] z-50 translate-x-[-50%] border-2 translate-y-[-50%] bg-amber-50 min-w-[50] rounded-2xl'>
                <h2 className='text-center font-bold text-4xl my-2 text-red-950'>Update User</h2>

                <input type="text"
                placeholder='userName'
                value={form.username}
                className='border black p-1.5 w-[60%] mx-auto mb-3 rounded'
                onChange={(e)=>setForm({...form , username : e.target.value})}
                />
                <input type="email"
                placeholder='email'
                value={form.email}
                className='border black p-1.5 w-[60%] mx-auto mb-3 rounded'
                onChange={(e)=>setForm({...form , email : e.target.value})}
                />
                <div className=' mb-3 flex justify-between w-[60%] mx-auto items-center'>
                    <button onClick={()=>{
                        setShowModelEdit(false)}}
                        className='bg-red-700 text-white p-2.5 rounded cursor-pointer'
                        >Cancel</button>
                        <button onClick={updateUsers}
                        className='bg-green-700 text-white p-2.5 rounded cursor-pointer'
                        >Edit</button>
                </div>
            </div>
        )}
    </div>
  )
}
