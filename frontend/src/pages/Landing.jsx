import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}

      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            Student Finance Tracker
          </h1>

          <div className="space-x-4">
            <Link to="/login" className="text-slate-700">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-bold text-slate-800 mb-6">
          Manage Your Finances With Confidence
        </h2>

        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
          A student-centred financial management system that helps students
          track income, monitor expenses, manage budgets, receive spending
          insights, and achieve savings goals.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>

          <Link to="/login" className="border px-6 py-3 rounded-lg">
            Login
          </Link>
        </div>
      </section>

      {/* Features */}

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold text-lg mb-2">Expense Tracking</h4>

              <p>Record and categorise daily spending.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold text-lg mb-2">Budget Management</h4>

              <p>Create budgets and monitor limits.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold text-lg mb-2">Smart Insights</h4>

              <p>Understand spending behaviour through analysis.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
