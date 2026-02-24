import { Mail, Phone, MapPin, Send } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const teamMembers = [
    {
      name: "MD Emon Sarkar",
      id: "08",
      image: "/emon.jpeg",
      email: "emon.sarkar@diu.edu.bd",
      phone: "+880 1XXX-XXXXXX",
      role: "Project Lead",
    },
    {
      name: "Showrov Shahriarar",
      id: "11",
      image: "https://i.pravatar.cc/300?img=33",
      email: "showrov.shahriarar@diu.edu.bd",
      phone: "+880 1XXX-XXXXXX",
      role: "Technical Lead",
    },
    {
      name: "Mohammad Tamim Hossen",
      id: "24",
      image: "/tamim.jpeg",
      email: "tamim.hossen@diu.edu.bd",
      phone: "+880 1XXX-XXXXXX",
      role: "Frontend Developer",
    },
    {
      name: "Montasir Hasan Peal",
      id: "27",
      image: "/peal.jpeg",
      email: "montasir.peal@diu.edu.bd",
      phone: "+880 1XXX-XXXXXX",
      role: "UI/UX Designer",
    },
    {
      name: "Nusrat Jahan",
      id: "38",
      image: "https://i.pravatar.cc/300?img=47",
      email: "nusrat.jahan@diu.edu.bd",
      phone: "+880 1XXX-XXXXXX",
      role: "Content Manager",
    },
    {
      name: "Nushaiba Kawser Era",
      id: "41",
      image: "https://i.pravatar.cc/300?img=44",
      email: "nushaiba.era@diu.edu.bd",
      phone: "+880 1XXX-XXXXXX",
      role: "QA Specialist",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Team Section */}
        <div className="mb-10 md:mb-12">
          <div className="text-center mb-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
              The People Behind It
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-4 text-gray-900">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                Team
              </span>
            </h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Dedicated professionals from the Department of CSE, DIU
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-violet-200 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Profile Image */}
                <div className="relative h-52 overflow-hidden bg-gray-900">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={`group-hover:scale-110 transition-transform duration-500 ${
                      member.id === "24"
                        ? "object-cover object-top"
                        : "object-cover"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="inline-block px-3 py-1 bg-violet-100 border border-violet-200 backdrop-blur-sm rounded-full text-xs font-semibold text-violet-700 mb-2">
                      ID: {member.id}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-sm text-violet-200 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-violet-600" />
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {member.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">{member.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message + University — same row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="text-center mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
                Reach Out
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.1] text-gray-900">
                Send Us a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                  Message
                </span>
              </h2>
              <p className="text-gray-500 mt-3 text-sm">
                We&apos;ll get back to you within 24 hours
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-300 transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-300 transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-300 transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-300 transition-all resize-none text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-700 to-indigo-600 hover:from-violet-600 hover:to-indigo-500 text-white py-3.5 rounded-xl transition-all font-bold text-sm shadow-lg shadow-indigo-900/40 hover:shadow-indigo-900/60 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* University Info */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
              Our Institution
            </p>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                Dhaka International University
              </span>
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Department of Computer Science &amp; Engineering
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-violet-600 shrink-0" />
              Satarkul, Uttar Badda, Dhaka, Bangladesh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
