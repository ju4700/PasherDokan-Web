import React, { useState, useEffect, useMemo } from 'react';
import { Github, Mail, Linkedin, Code, Users, Star, ChevronRight, Award, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  university: string;
  email: string;
  image?: string;
  github?: string;
  linkedin?: string;
  skills?: string[];
  bio?: string;
}

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className="bg-white rounded-2xl overflow-hidden transition-all shadow-lg hover:shadow-xl border border-gray-100 group">
        {/* Profile Image with gradient overlay */}
        <div className="w-full h-60 relative overflow-hidden">
          {member.image ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 to-gray-900/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-primary-300/30 flex items-center justify-center">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/60 backdrop-blur-sm text-gray-400">
                <Users size={40} />
              </div>
            </div>
          )}

          {/* Floating social icons that appear on hover */}
          <div className="absolute bottom-4 left-0 w-full px-4 z-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            {member.github && (
              <a 
                href={member.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-primary-600 transition-colors backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            )}
            {member.linkedin && (
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-primary-600 transition-colors backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
            <a 
              href={`mailto:${member.email}`} 
              className="p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-primary-600 transition-colors backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-110"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
        
        <div className="p-6">
          {/* Name and Role */}
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 text-sm font-medium">
              <Code size={14} />
              {member.role}
            </div>
          </div>
          
          {/* Education */}
          <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-600">
            <GraduationCap size={16} className="text-primary-400" />
            <span>{member.university}</span>
          </div>
          
          {/* Skills tags (if available) */}
          {member.skills && member.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {member.skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
          
          {/* Bio excerpt (if available) */}
          {member.bio && (
            <p className="mt-4 text-sm text-gray-600 line-clamp-3 text-center">
              {member.bio}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Team: React.FC = () => {
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  
  const teamMembers: TeamMember[] = useMemo(() => [
    {
      name: 'Jalal Uddin',
      role: 'Full-Stack Developer, Co-founder',
      university: 'International Islamic University, Chittagong',
      email: 'jalal.dev.design@gmail.com',
      github: 'https://github.com/ju4700',
      linkedin: 'https://linkedin.com/ju4700',
      image: '/images/jalal.jpg',
    },
    {
      name: 'Abu Zohaifa',
      role: 'Full-Stack Developer, Co-founder',
      university: 'International Islamic University, Chittagong',
      email: 'ultimatezrage@gmail.com',
      github: 'https://github.com/Zohaifa',
      linkedin: 'https://linkedin.com',
      image: '/images/zohaifa.jpg',
    },
    {
      name: 'Ahmed Shariar Plabon',
      role: 'Marketing Manager',
      university: 'International Islamic University, Chittagong',
      email: 'ahmedshahriar948@gmail.com',
      github: 'https://github.com/shahriar7ahmed',
      linkedin: 'https://linkedin.com',
      image: '/images/plabon.jpg',
    }
  ], []);

  useEffect(() => {
    setFilteredMembers(teamMembers);
  }, [teamMembers]);

  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-10"></div>
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary-50/40 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-secondary-50/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-3">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary-50/80 text-primary-700 font-semibold text-sm tracking-wide">
              Our Team
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-gray-900 leading-tight">
            Meet Our <span className="relative text-primary-600 inline-block">
              Dream Team
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C32 1.5 62 1.5 101.5 5.5C141 9.5 171 5.5 199 1.5" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="1" y1="5" x2="199" y2="5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" stopOpacity="0.3"/>
                    <stop offset="0.5" stopColor="#4F46E5" stopOpacity="1"/>
                    <stop offset="1" stopColor="#4F46E5" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            The talented developers behind PasherDokan bringing digital solutions to local shops across Bangladesh.
          </p>
        </motion.div>
        
        {/* Team Members */}
        <div>
          {filteredMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member, index) => (
                <TeamMemberCard key={index} member={member} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-gray-400 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No team members found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search or select a different role filter.
              </p>
              <button 
                onClick={() => {
                }}
                className="mt-6 px-5 py-2.5 bg-primary-50 text-primary-700 font-medium rounded-lg hover:bg-primary-100 transition-colors"
              >
                View Full Team
              </button>
            </motion.div>
          )}
        </div>
        
        {/* Core Values Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 mb-24"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Our Core <span className="text-primary-600">Values</span></h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Award size={24} />,
                title: "Excellence",
                description: "We strive for excellence in every line of code and every user interaction."
              },
              {
                icon: <Users size={24} />,
                title: "Collaboration",
                description: "We believe in the power of teamwork to solve complex problems together."
              },
              {
                icon: <Star size={24} />,
                title: "Innovation",
                description: "We continuously explore new technologies to deliver cutting-edge solutions."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-primary-100 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-primary-600 mb-5 group-hover:shadow-md transition-all">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Join Our Team Section - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] max-w-none h-full bg-gradient-to-r from-primary-600/5 via-primary-400/10 to-primary-600/5 rounded-[100%] transform -translate-y-[40%] blur-3xl -z-10"></div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/20 to-white z-0"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-br from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-3/5">
                <div className="inline-block mb-3">
                  <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                    We're Hiring!
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-5 text-gray-900">
                  Want to Join Our <span className="text-primary-600">Amazing Team</span>?
                </h3>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We're always looking for talented developers and designers who are passionate about 
                  creating innovative solutions for small businesses. Join us in revolutionizing 
                  Bangladesh's local commerce ecosystem.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <a 
                    href="mailto:careers@pasherdoban.com" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30"
                  >
                    Send Your Resume
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-xl transition-colors border border-gray-200 shadow-sm hover:shadow-md"
                  >
                    Learn More
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: <Code size={14} />, text: "Remote Friendly" },
                    { icon: <Star size={14} />, text: "Competitive Pay" },
                    { icon: <Users size={14} />, text: "Collaborative Culture" },
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm text-primary-700 rounded-lg text-sm shadow-sm border border-gray-100">
                      {benefit.icon}
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-2/5 flex justify-center">
                <motion.div 
                  className="relative"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-60 h-60 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                      {/* Team illustration or photo collage */}
                      <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.03]"></div>
                      
                      <div className="relative">
                        <motion.div 
                          className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Users size={64} className="text-primary-600" />
                        </motion.div>
                        
                        {/* Orbiting circles representing team members */}
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                          <motion.div 
                            key={i}
                            className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-lg border-2 border-white"
                            style={{ 
                              left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 100}px)`,
                              top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 100}px)`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            animate={{ 
                              left: `calc(50% + ${Math.cos((angle + 360) * Math.PI / 180) * 100}px)`,
                              top: `calc(50% + ${Math.sin((angle + 360) * Math.PI / 180) * 100}px)`,
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <span className="text-xl font-bold text-primary-600">
                              {i === 5 ? '+' : String.fromCharCode(65 + i)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;