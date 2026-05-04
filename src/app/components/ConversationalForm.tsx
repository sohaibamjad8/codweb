import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Upload, Sparkles, Mail, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';

interface FormData {
  name: string;
  contact: string;
  projectType: string;
  business: string;
  goal: string;
  budget: string;
  timeline: string;
  contactPreference: string;
  email?: string;
  phone?: string;
  file?: File;
}

interface ConversationalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConversationalForm({ isOpen, onClose }: ConversationalFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    projectType: '',
    business: '',
    goal: '',
    budget: '',
    timeline: '',
    contactPreference: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [needsAdditionalContact, setNeedsAdditionalContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const totalSteps = 9;
  const progress = (step / (totalSteps - 1)) * 100;

  const isEmail = (contact: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(contact.trim());
  };

  const isPhone = (contact: string): boolean => {
    const trimmedContact = contact.trim();
    // Must start with + and have at least 10 digits total
    if (!trimmedContact.startsWith('+')) {
      return false;
    }
    const digitsOnly = trimmedContact.replace(/[^\d]/g, '');
    // Should have between 10-15 digits (typical phone number range)
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  };

  const updateFormData = (key: keyof FormData, value: string | File) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear error when user types
    if (key === 'contact' || key === 'email' || key === 'phone') {
      setContactError('');
    }
  };

  const validateContact = (contact: string): boolean => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const trimmedContact = contact.trim();
    
    if (emailRegex.test(trimmedContact)) {
      return true; // Valid email
    }
    
    // Check if it looks like a phone number (contains mostly digits)
    const digitsOnly = trimmedContact.replace(/[^\d]/g, '');
    if (digitsOnly.length >= 10) {
      // It's a phone number - check if it has country code
      if (!trimmedContact.startsWith('+')) {
        setContactError('Please include country code (e.g., +971 56 599 8667)');
        return false;
      }
      return true; // Valid phone with country code
    }
    
    return false; // Not a valid email or phone
  };

  const handleNext = () => {
    // Validate contact on step 1
    if (step === 1) {
      if (!formData.contact) {
        setContactError('Please enter your email or phone number');
        return;
      }
      if (!validateContact(formData.contact)) {
        // Error message is set in validateContact if it's a phone without country code
        if (!contactError) {
          setContactError('Please enter a valid email address or phone number');
        }
        return;
      }
      
      // Store contact in appropriate field
      if (isEmail(formData.contact)) {
        updateFormData('email', formData.contact);
      } else if (isPhone(formData.contact)) {
        updateFormData('phone', formData.contact);
      }
    }
    
    // Validate additional contact info on step 8 (when needsAdditionalContact is true)
    if (step === 8 && needsAdditionalContact) {
      if (formData.contactPreference === 'email') {
        // Validate email
        if (!formData.email) {
          setContactError('Please enter your email address');
          return;
        }
        if (!isEmail(formData.email)) {
          setContactError('Please enter a valid email address');
          return;
        }
      } else if (formData.contactPreference === 'whatsapp') {
        // Validate phone
        if (!formData.phone) {
          setContactError('Please enter your WhatsApp number');
          return;
        }
        if (!isPhone(formData.phone)) {
          if (formData.phone && !formData.phone.startsWith('+')) {
            setContactError('Please include country code (e.g., +971 56 599 8667)');
          } else {
            setContactError('Please enter a valid phone number');
          }
          return;
        }
      }
    }
    
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Helper function to get readable label
      const getProjectTypeLabel = (value: string) => {
        const labels: { [key: string]: string } = {
          'website': 'Website Design',
          'branding': 'Branding/Logo',
          'uiux': 'UI/UX Design',
          'marketing': 'Marketing Materials',
          'other': 'Something Else'
        };
        return labels[value] || value;
      };

      const getGoalLabel = (value: string) => {
        const labels: { [key: string]: string } = {
          'launch': 'Launch a brand',
          'conversions': 'Improve conversions',
          'redesign': 'Redesign a site',
          'presence': 'Boost online presence',
          'other': 'Other'
        };
        return labels[value] || value;
      };

      const getBudgetLabel = (value: string) => {
        const labels: { [key: string]: string } = {
          '2k-4k': 'AED 2,000 – 4,000 (Basic / Starter projects)',
          '4k-8k': 'AED 4,000 – 8,000 (Standard business solutions)',
          '8k-15k': 'AED 8,000 – 15,000 (Advanced / growth-focused projects)',
          '15k+': 'AED 15,000+ (Premium / custom solutions)'
        };
        return labels[value] || value;
      };

      const getTimelineLabel = (value: string) => {
        const labels: { [key: string]: string } = {
          'immediate': 'Immediately',
          '2weeks': 'Within 2 weeks',
          'thismonth': 'This month',
          'later': 'Later'
        };
        return labels[value] || value;
      };

      // TODO: Add your Web3Forms access key from https://web3forms.com
      // For now, we'll simulate a successful submission
      const WEB3FORMS_ACCESS_KEY = '397e3785-8a63-450e-95f5-82f1d17ec5cc'; // Replace with your actual key

      // Create detailed message with all form data
      const messageBody = `
New Project Inquiry

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CLIENT INFORMATION
Name: ${formData.name}
Initial Contact: ${formData.contact}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Preferred Contact Method: ${formData.contactPreference === 'email' ? 'Email' : 'WhatsApp'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 PROJECT DETAILS
Project Type: ${getProjectTypeLabel(formData.projectType)}

💼 Business/Idea:
${formData.business}

🎯 Main Goal: ${getGoalLabel(formData.goal)}

💰 Budget Range: ${getBudgetLabel(formData.budget)}

📅 Timeline: ${getTimelineLabel(formData.timeline)}

${formData.file ? `📎 Attachment: ${formData.file.name}` : '📎 No files attached'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();

      if (WEB3FORMS_ACCESS_KEY) {
        const web3FormData = new FormData();

        web3FormData.append('access_key', WEB3FORMS_ACCESS_KEY);

        web3FormData.append('name', formData.name || 'Not provided');
        web3FormData.append('subject', `New Project Inquiry from ${formData.name}`);
        web3FormData.append('message', messageBody);

        web3FormData.append('from_name', formData.name || 'Website Lead');
        web3FormData.append('replyto', formData.email || '');


        if (formData.file) {
          web3FormData.append('attachment', formData.file);
        }

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: web3FormData
        });

        const data = await response.json();

        if (data.success) {
          console.log('Form submitted successfully:', data);
          setIsSubmitted(true);
        } else {
          throw new Error(data.message || 'Failed to send form');
        }
      } else {
        // Simulate successful submission for demo/development
        console.log('📧 Form Submission (Demo Mode - Configure Web3Forms for production)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(messageBody);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Sorry, there was an error sending your message. Please try again or contact us directly at hello@codweb.ae');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData('file', e.target.files[0]);
    }
  };

  const resetForm = () => {
    setStep(0);
    setFormData({
      name: '',
      contact: '',
      projectType: '',
      business: '',
      goal: '',
      budget: '',
      timeline: '',
      contactPreference: '',
    });
    setIsSubmitted(false);
    setShowCloseConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        className="relative w-full max-w-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-[#FED201]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={() => setShowCloseConfirm(true)}
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        {/* Content */}
        <div className="p-8 pt-8 min-h-[500px] flex flex-col relative z-10">
          <AnimatePresence mode="wait">
            {showCloseConfirm ? (
              // Close Confirmation
              <motion.div
                key="close-confirm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-center"
              >
                <div className="space-y-6 text-center">
                  {/* Animated Rocket Emoji */}
                  <motion.div 
                    className="text-8xl mb-4"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🚀
                  </motion.div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white">
                    Your business was about to level up — don't stop now!
                  </h2>
                  <p className="text-base md:text-lg text-gray-400">
                    You're just a few steps away from starting something amazing.
                  </p>
                  <div className="flex gap-4 justify-center mt-8">
                    <Button
                      onClick={() => setShowCloseConfirm(false)}
                      className="bg-[#FED201] hover:bg-[#FED201]/90 text-black px-8"
                    >
                      Continue Brief
                    </Button>
                    <Button
                      onClick={resetForm}
                      variant="ghost"
                      className="text-gray-400 hover:text-white hover:bg-white/10 px-8"
                    >
                      Close Anyway
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : !isSubmitted ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-center"
              >
                {/* Step 0: Greeting */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">👋</div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">Hey there!</h2>
                    <p className="text-base md:text-lg text-gray-400">What's your name?</p>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="Type your name here..."
                      className="text-lg py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && formData.name && handleNext()}
                    />
                  </div>
                )}

                {/* Step 1: Contact Info */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">📧</div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">
                      Nice to meet you, {formData.name}!
                    </h2>
                    <p className="text-base md:text-lg text-gray-400">How can we reach you?</p>
                    <Input
                      value={formData.contact}
                      onChange={(e) => updateFormData('contact', e.target.value)}
                      placeholder="Email or WhatsApp number"
                      className="text-lg py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && formData.contact && handleNext()}
                    />
                    {contactError && <p className="text-sm text-red-500 mt-2">{contactError}</p>}
                  </div>
                )}

                {/* Step 2: Project Type */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">🎨</div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">What do you need help with?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: '🌐 Website Design', value: 'website' },
                        { label: '🎯 Branding/Logo', value: 'branding' },
                        { label: '💫 UI/UX Design', value: 'uiux' },
                        { label: '📱 Marketing Materials', value: 'marketing' },
                        { label: '✨ Something Else', value: 'other' },
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          onClick={() => {
                            updateFormData('projectType', option.value);
                            setTimeout(handleNext, 300);
                          }}
                          className={`p-6 rounded-2xl border-2 transition-all text-left ${
                            formData.projectType === option.value
                              ? 'border-[#FED201] bg-[#FED201]/10 text-white'
                              : 'border-white/20 hover:border-[#FED201]/50 hover:bg-white/5 text-white'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-lg font-bold">{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Business Info */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">💼</div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">
                      Tell us about your business or idea
                    </h2>
                    <p className="text-base md:text-lg text-gray-400">Keep it brief — just a few lines!</p>
                    <Textarea
                      value={formData.business}
                      onChange={(e) => updateFormData('business', e.target.value)}
                      placeholder="E.g., We're a sustainable fashion brand launching our first collection..."
                      className="text-lg min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      autoFocus
                    />
                  </div>
                )}

                {/* Step 4: Goal */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">🎯</div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">What's your main goal?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: '🚀 Launch a brand', value: 'launch' },
                        { label: '📈 Improve conversions', value: 'conversions' },
                        { label: '✨ Redesign a site', value: 'redesign' },
                        { label: '💡 Boost online presence', value: 'presence' },
                        { label: '🎪 Other', value: 'other' },
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          onClick={() => {
                            updateFormData('goal', option.value);
                            setTimeout(handleNext, 300);
                          }}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            formData.goal === option.value
                              ? 'border-[#FED201] bg-[#FED201]/10 text-white'
                              : 'border-white/20 hover:border-[#FED201]/50 hover:bg-white/5 text-white'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-lg font-bold">{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Budget */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">💰</div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">What's your budget range?</h2>
                    <p className="text-base md:text-lg text-gray-400">This helps us tailor our proposal</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: 'AED 2,000 – 4,000', subtitle: '(Basic / Starter projects)', value: '2k-4k' },
                        { label: 'AED 4,000 – 8,000', subtitle: '(Standard business solutions)', value: '4k-8k' },
                        { label: 'AED 8,000 – 15,000', subtitle: '(Advanced / growth-focused projects)', value: '8k-15k' },
                        { label: 'AED 15,000+', subtitle: '(Premium / custom solutions)', value: '15k+' },
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          onClick={() => {
                            updateFormData('budget', option.value);
                            setTimeout(handleNext, 300);
                          }}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            formData.budget === option.value
                              ? 'border-[#FED201] bg-[#FED201]/10 text-white'
                              : 'border-white/20 hover:border-[#FED201]/50 hover:bg-white/5 text-white'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-lg font-bold">{option.label}</div>
                          <div className="text-sm text-gray-400 mt-1">{option.subtitle}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 6: Timeline */}
                {step === 6 && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">📅</div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">When do you want to get started?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: '⚡ Immediately', value: 'immediate' },
                        { label: '📆 Within 2 weeks', value: '2weeks' },
                        { label: '📊 This month', value: 'thismonth' },
                        { label: '⏳ Later', value: 'later' },
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          onClick={() => {
                            updateFormData('timeline', option.value);
                            setTimeout(handleNext, 300);
                          }}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            formData.timeline === option.value
                              ? 'border-[#FED201] bg-[#FED201]/10 text-white'
                              : 'border-white/20 hover:border-[#FED201]/50 hover:bg-white/5 text-white'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-lg font-bold">{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 7: Contact Preference */}
                {step === 7 && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">💬</div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">How should we reach you?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.button
                        onClick={() => {
                          updateFormData('contactPreference', 'email');
                          // Check if user already has email
                          if (formData.email) {
                            // Already have email, skip step 8 and go to file upload
                            setTimeout(() => setStep(8), 300);
                          } else {
                            // Need to ask for email at step 8
                            setNeedsAdditionalContact(true);
                            setTimeout(handleNext, 300);
                          }
                        }}
                        className={`p-8 rounded-2xl border-2 transition-all ${
                          formData.contactPreference === 'email'
                            ? 'border-[#FED201] bg-[#FED201]/10'
                            : 'border-white/20 hover:border-[#FED201]/50 hover:bg-white/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Mail className={`h-12 w-12 mx-auto mb-3 ${formData.contactPreference === 'email' ? 'text-[#FED201]' : 'text-gray-400'}`} />
                        <span className="text-xl font-bold text-white">Email</span>
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          updateFormData('contactPreference', 'whatsapp');
                          // Check if user already has phone
                          if (formData.phone) {
                            // Already have phone, skip step 8 and go to file upload
                            setTimeout(() => setStep(8), 300);
                          } else {
                            // Need to ask for phone at step 8
                            setNeedsAdditionalContact(true);
                            setTimeout(handleNext, 300);
                          }
                        }}
                        className={`p-8 rounded-2xl border-2 transition-all ${
                          formData.contactPreference === 'whatsapp'
                            ? 'border-[#FED201] bg-[#FED201]/10'
                            : 'border-white/20 hover:border-[#FED201]/50 hover:bg-white/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageCircle className={`h-12 w-12 mx-auto mb-3 ${formData.contactPreference === 'whatsapp' ? 'text-[#FED201]' : 'text-gray-400'}`} />
                        <span className="text-xl font-bold text-white">WhatsApp</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Step 8: Additional Contact Info if needed */}
                {step === 8 && needsAdditionalContact && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">
                      {formData.contactPreference === 'email' ? '📧' : '📱'}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">
                      {formData.contactPreference === 'email'
                        ? "What's your email address?"
                        : "What's your WhatsApp number?"}
                    </h2>
                    <p className="text-base md:text-lg text-gray-400">
                      {formData.contactPreference === 'email'
                        ? 'We\'ll use this to send you updates and proposals'
                        : 'We\'ll use WhatsApp for quick communication'}
                    </p>
                    <Input
                      value={
                        formData.contactPreference === 'email'
                          ? formData.email || ''
                          : formData.phone || ''
                      }
                      onChange={(e) =>
                        updateFormData(
                          formData.contactPreference === 'email' ? 'email' : 'phone',
                          e.target.value
                        )
                      }
                      placeholder={
                        formData.contactPreference === 'email'
                          ? 'your@email.com'
                          : '+971 56 599 8667'
                      }
                      className="text-lg py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      autoFocus
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const value =
                            formData.contactPreference === 'email'
                              ? formData.email
                              : formData.phone;
                          if (value) handleNext();
                        }
                      }}
                    />
                    {contactError && <p className="text-sm text-red-500 mt-2">{contactError}</p>}
                  </div>
                )}

                {/* Step 8: File Upload (when additional contact not needed) */}
                {step === 8 && !needsAdditionalContact && (
                  <div className="space-y-6">
                    <div className="text-6xl mb-4">📎</div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">One last thing...</h2>
                    <p className="text-base md:text-lg text-gray-400">
                      Have any references or moodboards? (Optional)
                    </p>
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-[#FED201]/50 transition-colors bg-white/5">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/*,.pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="h-12 w-12 text-gray-400 mb-3" />
                        <span className="text-lg font-bold text-white">
                          {formData.file ? formData.file.name : 'Click to upload'}
                        </span>
                        <span className="text-sm text-gray-500 mt-2">
                          or drag and drop
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              // Success Message
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Sparkles className="h-24 w-24 text-[#FED201] mx-auto" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white">Thanks {formData.name}! 🎉</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-md">
                  We've received your project brief — our team will reach out shortly to
                  discuss how we can bring your ideas to life! ✨
                </p>
                <Button
                  onClick={resetForm}
                  size="lg"
                  className="bg-[#FED201] hover:bg-[#FED201]/90 text-black mt-6"
                >
                  Close
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {!isSubmitted && !showCloseConfirm && (
            <div className="flex flex-col gap-2">
              {submitError && (
                <p className="text-sm text-red-500 text-center">{submitError}</p>
              )}
              <div className="flex justify-between items-center mt-8">
                <Button
                  onClick={handleBack}
                  variant="ghost"
                  disabled={step === 0 || isSubmitting}
                  className="disabled:opacity-0 text-white hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                {step < totalSteps - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={
                      (step === 0 && !formData.name) ||
                      (step === 1 && !formData.contact) ||
                      (step === 3 && !formData.business) ||
                      isSubmitting
                    }
                    className="bg-[#FED201] hover:bg-[#FED201]/90 text-black"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#FED201] hover:bg-[#FED201]/90 text-black"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Send My Brief
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Minimal Progress Bar at Bottom */}
        {!isSubmitted && !showCloseConfirm && (
          <div className="relative z-10 pb-6">
            {/* Progress Bar Container */}
            <div className="max-w-md mx-auto px-8">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#FED201] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              {/* Step Counter */}
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-400 font-medium">
                  Step {step + 1}/{totalSteps}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}