"use client";

import { useState, useEffect } from "react";
import { X, Camera, MapPin, AlertTriangle, Upload, Send } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { useAuth } from "@/contexts/AuthContext";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: any) => void;
}

const hazardTypes = [
  { value: "tsunami_warning", label: "Tsunami Warning" },
  { value: "high_wave", label: "High Waves" },
  { value: "storm_surge", label: "Storm Surge" },
  { value: "flooding", label: "Coastal Flooding" },
  { value: "erosion", label: "Beach Erosion" },
  { value: "oil_spill", label: "Oil Spill" },
  { value: "marine_pollution", label: "Marine Pollution" },
  { value: "other", label: "Other" }
];

const severityLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
];

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: "",
    severity: "medium",
    description: "",
    location: { lat: 0, lng: 0 },
    media: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation();
    }
  }, [isOpen]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          setLocationPermission(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationPermission(false);
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!isAuthenticated) {
      setError("Please login to submit a report");
      setIsSubmitting(false);
      return;
    }

    try {
      const report = {
        type: formData.type,
        severity: formData.severity,
        description: formData.description,
        latitude: formData.location.lat,
        longitude: formData.location.lng,
        media: formData.media
      };
      
      await onSubmit(report);
      
      // Reset form
      setFormData({
        type: "",
        severity: "medium",
        description: "",
        location: { lat: 0, lng: 0 },
        media: []
      });
    } catch (error: any) {
      setError(error.message || "Error submitting report");
      console.error("Error submitting report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, media: [...prev.media, ...files] }));
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <span>Report Coastal Hazard</span>
              </h2>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Hazard Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hazard Type *
                </label>
                <Select.Root
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <Select.Trigger className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Select.Value placeholder="Select hazard type" />
                    <Select.Icon />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-300 rounded-lg shadow-lg">
                      <Select.Viewport className="p-1">
                        {hazardTypes.map((type) => (
                          <Select.Item
                            key={type.value}
                            value={type.value}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <Select.ItemText>{type.label}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              {/* Severity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level *
                </label>
                <Select.Root
                  value={formData.severity}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
                >
                  <Select.Trigger className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Select.Value />
                    <Select.Icon />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-300 rounded-lg shadow-lg">
                      <Select.Viewport className="p-1">
                        {severityLevels.map((level) => (
                          <Select.Item
                            key={level.value}
                            value={level.value}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <Select.ItemText>{level.label}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you're observing..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {locationPermission 
                      ? `Lat: ${formData.location.lat.toFixed(4)}, Lng: ${formData.location.lng.toFixed(4)}`
                      : "Location not available"
                    }
                  </span>
                </div>
                {!locationPermission && (
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    Enable Location Access
                  </button>
                )}
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo/Video (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.media.length > 0 
                        ? `${formData.media.length} file(s) selected` 
                        : "Click to upload media"}
                    </p>
                  </label>
                  {formData.media.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.media.map((file, index) => (
                        <div key={index} className="text-xs text-gray-500 flex items-center justify-between">
                          <span>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              media: prev.media.filter((_, i) => i !== index)
                            }))}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.type || !formData.description || isSubmitting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Report</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ReportModal;
