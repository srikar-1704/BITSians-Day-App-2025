import { Event } from '../types/Event';

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

export const EventPopup = ({ event, onClose }: EventPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{event.city} Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Geography Badge */}
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: event.color }}
            ></div>
            <span className="text-sm font-medium text-gray-600">{event.geography}</span>
          </div>

          {/* Organizer Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Organizer</h3>
            <p className="text-gray-700">{event.organizer}</p>
            <div className="mt-2 space-y-1">
              <a 
                href={`mailto:${event.email}`}
                className="text-blue-600 hover:text-blue-800 text-sm block"
              >
                📧 {event.email}
              </a>
              {event.phone && (
                <a 
                  href={`tel:${event.phone}`}
                  className="text-blue-600 hover:text-blue-800 text-sm block"
                >
                  📞 {event.phone}
                </a>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-3">
            {event.timeAndDate && (
              <div>
                <h4 className="font-semibold text-gray-800">📅 Date & Time</h4>
                <p className="text-gray-700">{event.timeAndDate}</p>
              </div>
            )}

            {event.venueDetails && (
              <div>
                <h4 className="font-semibold text-gray-800">📍 Venue</h4>
                <p className="text-gray-700">{event.venueDetails}</p>
              </div>
            )}

            {event.otherDetails && (
              <div>
                <h4 className="font-semibold text-gray-800">ℹ️ Additional Info</h4>
                <p className="text-gray-700">{event.otherDetails}</p>
              </div>
            )}
          </div>

          {/* Registration Button */}
          {event.registrationLink && (
            <div className="pt-4">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 block text-center"
              >
                Register for Event
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};