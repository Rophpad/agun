const UserProfile = () => {
  return (
    <div className="bg-white h-max rounded-lg">
      {/* Champ pseudo */}
      <div className="p-3">
        <input
          type="text"
          className="w-3/5 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Ton pseudo..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Solde affiché */}
      <div className="mx-3 mb-2">
        <div className="inline-block bg-green-200 text-teal-700 font-bold px-3 py-2 rounded-2xl text-sm">
          Solde : {userBalance} sats
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
