import LoginForm from "../_components/login_form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* Left Login Form */}
        <div className="md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
          <LoginForm />
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="font-bold text-2xl mb-4 text-gray-800">
            Discover Places, Create Memories, Live the Journey.
          </h2>
          <img
            src="/boats.jpg"
            alt="Nepal"
            className="rounded-lg object-cover w-full h-64 md:h-full"
          />
        </div>

      </div>
    </div>
  );
}
