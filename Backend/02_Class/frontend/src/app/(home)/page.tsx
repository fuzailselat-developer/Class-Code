'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
}

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [userLoading, setUserLoading] = useState(false);
  const [editIndex, setEditIndex] = useState<null | number>(null)

  const fetchAllUsers = async () => {
    setLoading(true);

    try {
      const res = await fetch('http://localhost:2000/api/users');
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || 'Something went wrong');
        return;
      }

      setUsers(result.data);
    } catch (error) {
      console.error(error);
      toast.error('Network error. Please try again.');



    } finally {
      setLoading(false);
    }
  };

  const createNewUser = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }

    setUserLoading(true);

    try {
      const res = await fetch('http://localhost:2000/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || 'Something went wrong');
        return;
      }

      toast.success(result.message);
      setName('');
      fetchAllUsers();
    } catch (error) {
      console.error(error);
      toast.error('Network error. Please try again.');
    } finally {
      setUserLoading(false);
    }
  };

  const editUser = (index: number, name: string) => {
    setEditIndex(index)
    setName(name)
  }

  const updateUser = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }

    setUserLoading(true);

    try {
      const res = await fetch(`http://localhost:2000/api/users/update/${editIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || 'Something went wrong');
        return;
      }

      toast.success(result.message);
      setName('');
      fetchAllUsers();
      setEditIndex(null)
    } catch (error) {
      console.error(error);
      toast.error('Network error. Please try again.');
      setEditIndex(null)
    } finally {
      setUserLoading(false);
    }
  }

  const deleteAll = async () => {
    try {

      const res = await fetch('http://localhost:2000/api/users/delete-all', {
        method: "DELETE"
      })

      const result = await res.json()

      toast.success(result.message);
      setName('');
      setUsers([])
      setEditIndex(null)

    } catch (error) {
      console.error(error);
      toast.error('Network error. Please try again.');
      setEditIndex(null)
    }
  }

  const deleteUser = async (index: number) => {
    try {

      const res = await fetch(`http://localhost:2000/api/users/delete/${index}`, {
        method: "DELETE"
      })

      const result = await res.json()
      console.log(result)

      if (!res.ok) {
        toast.error(result.message || 'Something went wrong');
        return;
      }

      if (result.data.length != 0) {
        fetchAllUsers()
      }
      else {
        setUsers([])
      }
      toast.success(result.message);

    } catch (error) {
      console.error(error);
      toast.error('Network error. Please try again.');
      setEditIndex(null)
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold text-slate-700">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Users Management
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter user name..."
            value={name}
            autoComplete="off"
            autoFocus
            disabled={userLoading}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createNewUser()}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            onClick={editIndex ? updateUser : updateUser}
            disabled={userLoading}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >

            {
              userLoading ?
                (
                  editIndex != null ? "Updating..." : "Adding..."
                ) :
                (
                  editIndex != null ? "Update" : "Add User"
                )
            }

          </button>
          <button
            onClick={deleteAll}
            className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            Delete All
          </button>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-700">
            Users ({users.length})
          </h2>

          {users.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 py-8 text-center text-slate-500">
              No users found.
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-slate-500">ID: {user.id}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        editUser(index, user.name)
                      }}
                      className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                      onClick={() => deleteUser(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;