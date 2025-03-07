const DeleteListingModal = ({ isModalOpen, handleCloseModal, handleDelete, listingName, listingID }: any) => {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">
                    Are you sure you want to delete {listingName}?
                </h2>
                <p className="mb-4">
                    This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                    <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
                        Cancel
                    </button>
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>

        </div>
    )
}

export default DeleteListingModal