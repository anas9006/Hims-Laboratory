import React from 'react';
import { 
    FlaskConical, 
    Beaker, 
    TestTube, 
    Microscope, 
    FileText, 
    Receipt,
    ArrowRight,
    Clock,
    CalendarCheck,
    Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    // Quick stats data
    const stats = [
        { label: "Today's Tests", value: "47", icon: Activity, color: "bg-blue-500" },
        { label: "Pending Reports", value: "12", icon: Clock, color: "bg-yellow-500" },
        { label: "Today's Appointments", value: "23", icon: CalendarCheck, color: "bg-green-500" },
        { label: "Total Patients", value: "1,284", icon: FileText, color: "bg-purple-500" },
    ];

    // Laboratory modules quick access
    const labModules = [
        { name: "Test Types", path: "/labTestType", icon: FlaskConical, color: "bg-teal-500" },
        { name: "Test Categories", path: "/labTestCat", icon: Beaker, color: "bg-blue-500" },
        { name: "Specimens", path: "/labTestSpecimens", icon: TestTube, color: "bg-indigo-500" },
        { name: "Attributes", path: "/labTestsAttributes", icon: Microscope, color: "bg-purple-500" },
        { name: "Attribute Groups", path: "/labTestsAttributesGroup", icon: FileText, color: "bg-pink-500" },
        { name: "Reporting Formats", path: "/labReportingFormats", icon: FileText, color: "bg-orange-500" },
        { name: "Tests", path: "/labTests", icon: Beaker, color: "bg-red-500" },
        { name: "Lab Receipt", path: "/labReceipt", icon: Receipt, color: "bg-green-500" },
    ];

    // Recent activities
    const recentActivities = [
        { id: 1, action: "New test added", item: "COVID-19 PCR", time: "5 minutes ago", user: "Dr. Smith" },
        { id: 2, action: "Category updated", item: "Blood Chemistry", time: "15 minutes ago", user: "Admin" },
        { id: 3, action: "New specimen type", item: "Urine Culture", time: "1 hour ago", user: "Lab Tech" },
        { id: 4, action: "Report generated", item: "Complete Blood Count", time: "2 hours ago", user: "Dr. Johnson" },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome to HIMS Laboratory</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your laboratory tests, categories, and reports</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg bg-opacity-10`}>
                                <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Access Modules */}
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Laboratory Quick Access</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                    {labModules.map((module, index) => (
                        <Link
                            key={index}
                            to={module.path}
                            className="group flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className={`${module.color} p-3 rounded-lg text-white mb-2 group-hover:scale-110 transition-transform`}>
                                <module.icon className="h-5 w-5" />
                            </div>
                            <span className="text-xs text-center text-gray-600 group-hover:text-gray-900">
                                {module.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
                        <Link to="/reports" className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1">
                            View All <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-800">{activity.action}:</span>
                                        <span className="text-sm text-teal-600">{activity.item}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500">{activity.user}</span>
                                        <span className="text-xs text-gray-400">•</span>
                                        <span className="text-xs text-gray-500">{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions & Info */}
                <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="bg-teal-500 p-2 rounded-lg">
                                    <Receipt className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">New Test Entry</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-teal-600" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-500 p-2 rounded-lg">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Generate Report</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-blue-600" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-500 p-2 rounded-lg">
                                    <Beaker className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Add Test Category</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-purple-600" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-500 p-2 rounded-lg">
                                    <TestTube className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">New Specimen</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-green-600" />
                        </button>
                    </div>

                    {/* System Info */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">System Information</h3>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Version</span>
                                <span className="text-gray-800 font-medium">2.1.0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Last Backup</span>
                                <span className="text-gray-800 font-medium">Today, 03:00 AM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Database Status</span>
                                <span className="text-green-600 font-medium">Connected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;