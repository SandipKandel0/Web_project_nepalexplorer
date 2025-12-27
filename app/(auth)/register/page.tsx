import RegisterForm from "../_components/register_form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">

        {/* Left: Register Form */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
          <RegisterForm />
        </div>

        {/* Right: Image/Promo Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
          <h2 className="font-bold text-2xl mb-4 text-gray-800 text-center">
            Discover Places, Create Memories, Live the Journey.
          </h2>
          <img
            src="/image.jpeg"
            alt="Nepal"
            className="rounded-lg object-cover w-80 h-48 md:w-96 md:h-60"
          />
        </div>

      </div>
    </div>
  );
}
