import { ArrowRight, Stethoscope, FileText, Plus, Search } from "lucide-react";
import { useState } from "react";

function DoctorDashboard({ onBackHome }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock patient data - replace with API call
  const mockPatients = [
    {
      id: 1,
      name: "John Doe",
      age: 35,
      email: "john@example.com",
      lastVisit: "2024-11-10",
      condition: "Hypertension",
      records: [
        { date: "2024-11-10", type: "Blood Pressure", value: "130/80" },
        { date: "2024-11-05", type: "Heart Rate", value: "72 bpm" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      email: "jane@example.com",
      lastVisit: "2024-11-08",
      condition: "Diabetes",
      records: [
        { date: "2024-11-08", type: "Blood Glucose", value: "120 mg/dL" },
      ],
    },
    {
      id: 3,
      name: "Mike Johnson",
      age: 45,
      email: "mike@example.com",
      lastVisit: "2024-11-12",
      condition: "Asthma",
      records: [
        { date: "2024-11-12", type: "Spirometry", value: "FEV1: 85%" },
      ],
    },
  ];

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Doctor Dashboard</h1>
            <p className="text-gray-600 mt-2">Access and review patient medical records</p>
          </div>
          <button
            onClick={onBackHome}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Back to Home
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
          />
        </div>

        {/* Patient List & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-1 bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Patients</h2>
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`w-full text-left p-4 rounded-lg transition ${
                    selectedPatient?.id === patient.id
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-white border border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="font-semibold text-gray-800">{patient.name}</div>
                  <div className="text-sm text-gray-600">{patient.email}</div>
                  <div className="text-xs text-gray-500 mt-1">Last visit: {patient.lastVisit}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {selectedPatient.name}
                </h2>

                {/* Patient Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Age</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {selectedPatient.age}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {selectedPatient.email}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Condition</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {selectedPatient.condition}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Last Visit</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {selectedPatient.lastVisit}
                    </div>
                  </div>
                </div>

                {/* Medical Records */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Medical Records
                  </h3>
                  <div className="space-y-3">
                    {selectedPatient.records.map((record, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold text-gray-800">
                              {record.type}
                            </div>
                            <div className="text-sm text-gray-600">
                              {record.date}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            {record.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    View Full History
                  </button>
                  <button
                    className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Notes
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Select a patient to view their medical records
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorDashboard;
