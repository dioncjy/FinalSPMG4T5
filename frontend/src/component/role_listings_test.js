import React, { useEffect, useState } from 'react'

export default function RoleListings() {

    const [roleListings, setRoleListings] = useState([]);

    useEffect(() => {
        
        const getAllRoleListings = 'http://127.0.0.1:5000/role_listings/all'

        fetch(getAllRoleListings)
            .then((response) => response.json())
            .then ((data) => {
                setRoleListings(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    return (
        <ul role="list" className="divide-y divide-gray-100">
      {roleListings.map((listing) => (
        <li key={listing.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{listing.role_name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{listing.department}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{listing.role}</p>
            {listing.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime={listing.lastSeenDateTime}>{listing.lastSeen}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
        
      );
  }