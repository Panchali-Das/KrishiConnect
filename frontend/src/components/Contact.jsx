import { Phone, Mail, MapPin, Clock, User, Building2 } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact-section" className="bg-[#F7FBF4] py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}

        <div className="grid lg:grid-cols-[170px_1fr] gap-20 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-600"></span>

              <span className="text-green-700 text-sm font-medium">
                Contact
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-5xl font-semibold text-gray-900">Contact Us</h2>

            <p className="mt-4 text-gray-500 max-w-3xl leading-8">
              Have questions about KrishiConnect? We'd love to hear from you.
            </p>
          </div>
        </div>

        {/* Main Card */}

        <div className="bg-white rounded-[40px] shadow-xl p-10 lg:p-14">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* LEFT */}

            <div>
              <h3 className="text-4xl font-semibold text-gray-900">
                Contact Information
              </h3>

              <p className="mt-5 text-gray-500 leading-8">
                We'd love to hear from you. Reach out to us anytime and our team
                will respond as soon as possible.
              </p>

              {/* Contact Details */}

              <div className="space-y-8 mt-10">
                {/* Phone */}

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <Phone className="text-green-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Phone</h4>

                    <p className="text-gray-500">+91 98765 43210</p>
                  </div>
                </div>

                {/* Email */}

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <Mail className="text-green-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Email</h4>

                    <p className="text-gray-500">support@krishiconnect.com</p>
                  </div>
                </div>

                {/* Address */}

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <MapPin className="text-green-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Address</h4>

                    <p className="text-gray-500">
                      Netaji Subhash Engineering College, Kolkata, India
                    </p>
                  </div>
                </div>

                {/* Time */}

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <Clock className="text-green-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Working Hours</h4>

                    <p className="text-gray-500">
                      Monday - Friday | 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map */}

              <div className="mt-10 overflow-hidden rounded-3xl shadow-lg">
                <iframe
                  title="KrishiConnect Location"
                  src="https://www.google.com/maps?q=Netaji+Subhash+Engineering+College+Kolkata&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
            {/* RIGHT */}

            <div>
              <h3 className="text-4xl font-semibold text-gray-900">
                Send Us a Message
              </h3>

              <p className="mt-5 text-gray-500 leading-8">
                Fill up the form and our team will get back to you within 24
                hours.
              </p>

              <form className="mt-10 space-y-6">
                {/* Row 1 */}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>

                    <div className="relative">
                      <User className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                      <input
                        type="text"
                        placeholder="Enter first name"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>

                    <div className="relative">
                      <User className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                      <input
                        type="text"
                        placeholder="Enter last name"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2 */}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                      <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>

                    <div className="relative">
                      <Phone className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                      <input
                        type="text"
                        placeholder="Enter phone"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Type your message..."
                    className="w-full h-80 px-4 py-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Button */}

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
