import { useQuery } from '@apollo/client';
import { DETAILED_EVENT_DETAILS } from 'GraphQl/Queries/Queries';
import { LeftDrawerEventWrapper } from 'components/LeftDrawerEvent/LeftDrawerEventWrapper';
import Loader from 'components/Loader/Loader';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';

const AttendencePage = (): JSX.Element => {
  const { eventId } = useParams();

  const { data: eventData, loading: eventInfoLoading } = useQuery(
    DETAILED_EVENT_DETAILS,
    {
      variables: { id: eventId },
    },
  );
  if (eventInfoLoading) {
    return <Loader />;
  }
  console.log(eventData, 'eventData');
  return (
    <LeftDrawerEventWrapper
      event={eventData.event}
      key={`${eventData?.event._id || 'loading'}EventDashboard`}
    >
      <h3>Attendence Page</h3>
      <Card.Body>
        <Card.Title>{eventData.event.title}</Card.Title>
        <Card.Text>
          <strong>Description:</strong> {eventData.event.description}
        </Card.Text>
        <Card.Text>
          <strong>Start Date:</strong> {eventData.event.startDate}
        </Card.Text>
        <Card.Text>
          <strong>End Date:</strong> {eventData.event.endDate}
        </Card.Text>
        <Card.Text>
          <strong>Start Time:</strong>{' '}
          {eventData.event.startTime || 'Not specified'}
        </Card.Text>
        <Card.Text>
          <strong>End Time:</strong>{' '}
          {eventData.event.endTime || 'Not specified'}
        </Card.Text>
        <Card.Text>
          <strong>All Day Event:</strong>{' '}
          {eventData.event.allDay ? 'Yes' : 'No'}
        </Card.Text>
        <Card.Text>
          <strong>Location:</strong> {eventData.event.location}
        </Card.Text>
        <Card.Text>
          <strong>Organization Members:</strong>
          <ul>
            {eventData.event.organization?.members.map((member:any) => (
              <li key={member._id}>
                {member.firstName} {member.lastName}
              </li>
            ))}
          </ul>
        </Card.Text>
        <Card.Text>
          <strong>Attendees:</strong>
          <ul>
            {eventData.event.attendees.map((attendee:any) => (
              <li key={attendee._id}>
                <span style={{ color: eventData.event.actionItems.some((actionItem:any) => actionItem.assignee._id === attendee._id) ? 'red' : 'inherit' }}>
                  {attendee.firstName} {attendee.lastName}
                </span>
              </li>
            ))}
          </ul>
        </Card.Text>
        <Card.Text>
          <strong>Recurring:</strong> {eventData.event.recurring ? 'Yes' : 'No'}
        </Card.Text>
        <Card.Text>
          <strong>Recurrence Frequency:</strong>{' '}
          {eventData.event.recurrenceRule?.frequency || 'Not specified'}
        </Card.Text>
        <Card.Text>
          <strong>Is Public:</strong> {eventData.event.isPublic ? 'Yes' : 'No'}
        </Card.Text>
        <Card.Text>
          <strong>Is Registerable:</strong>{' '}
          {eventData.event.isRegisterable ? 'Yes' : 'No'}
        </Card.Text>
        <Card.Text>
          <strong>Status:</strong> {eventData.event.status}
        </Card.Text>
        <Card.Text>
          <strong>Agenda Items:</strong>
          <ul>
            {eventData.event.agendaItems?.map((item:any) => (
              <li key={item._id}>{item.name}</li>
            ))}
          </ul>
        </Card.Text>
        <Card.Text>
          <strong>Attendees Check-In Status:</strong>
          <ul>
            {eventData.event.attendeesCheckInStatus.map((checkInStatus:any) => (
              <li key={checkInStatus._id}>
                {checkInStatus.user.firstName} {checkInStatus.user.lastName}:{' '}
                {checkInStatus.checkedIn ? 'Checked In' : 'Not Checked In'}
              </li>
            ))}
          </ul>
        </Card.Text>
        <Card.Text>
          <strong>Action Items:</strong>
          <ul className="list-group mt-2">
          {eventData.event.actionItems.map((actionItem:any, index:any) => (
            <li key={index} className="list-group-item">
              <strong>Category:</strong> {actionItem.actionItemCategory.name}<br />
              <strong>Assignee:</strong> {actionItem.assignee.firstName} {actionItem.assignee.lastName}<br />
              <strong>Assigner:</strong> {actionItem.assigner.firstName} {actionItem.assigner.lastName}<br />
              <strong>Due Date:</strong> {actionItem.dueDate}<br />
              <strong>Completion Date:</strong> {actionItem.completionDate}<br />
              <strong>Is Completed:</strong> {actionItem.isCompleted ? 'Yes' : 'No'} <br/>
              <strong>Pre-Completion Notes:</strong> {actionItem.preCompletionNotes}<br />

            </li>
          ))}
        </ul>
        </Card.Text>
      </Card.Body>
      
    </LeftDrawerEventWrapper>
  );
};

export default AttendencePage;
