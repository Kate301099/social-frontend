import React from "react";


export default function UserProfileCard() {
    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Header with Avatar */}
                    <div className="flex bg-black text-white h-52 relative p-6">
                        <div className="absolute left-6 top-28 flex flex-col items-center">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                alt="Avatar"
                                className="w-36 h-36 rounded-full border-4 border-white shadow-md"
                            />
                            <button className="mt-2 px-4 py-1 text-sm border border-gray-600 text-gray-700 rounded hover:bg-gray-100">
                                Edit profile
                            </button>
                        </div>
                        <div className="ml-44 mt-28">
                            <h2 className="text-xl font-semibold">Andy Horwitz</h2>
                            <p className="text-sm text-gray-300">New York</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end gap-12 text-center text-gray-700">
                        <div>
                            <p className="text-lg font-bold">253</p>
                            <p className="text-sm">Photos</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">1026</p>
                            <p className="text-sm">Followers</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">478</p>
                            <p className="text-sm">Following</p>
                        </div>
                    </div>

                    {/* About */}
                    <div className="p-6 text-gray-800">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">About</h3>
                            <div className="bg-gray-100 p-4 rounded-md space-y-1">
                                <p className="italic">Web Developer</p>
                                <p className="italic">Lives in New York</p>
                                <p className="italic">Photographer</p>
                            </div>
                        </div>

                        {/* Recent Photos */}
                        <div className="mb-4 flex justify-between items-center">
                            <h3 className="text-lg font-medium">Recent photos</h3>
                            <a href="#!" className="text-sm text-blue-600 hover:underline">
                                Show all
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                alt="Recent 1"
                                className="rounded-md object-cover w-full"
                            />
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                alt="Recent 2"
                                className="rounded-md object-cover w-full"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                alt="Recent 3"
                                className="rounded-md object-cover w-full"
                            />
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                alt="Recent 4"
                                className="rounded-md object-cover w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
