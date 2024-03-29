import React from 'react';
import styles from './OrgPeopleListCard.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { REMOVE_MEMBER_MUTATION } from 'GraphQl/Mutations/mutations';
import { useParams } from 'react-router-dom';
import { errorHandler } from 'utils/errorHandler';

interface InterfaceOrgPeopleListCardProps {
  key: number;
  id: string;
  firstName: string;
  lastName: string;
  // registeredEvents:;
}

function orgPeopleListCard(
  props: InterfaceOrgPeopleListCardProps,
): JSX.Element {
  const { orgId: currentUrl } = useParams();
  const [remove] = useMutation(REMOVE_MEMBER_MUTATION);
  const [showRemoveAdminModal, setShowRemoveAdminModal] = React.useState(false);
  const [showEventAttendenceModal, setShowEventAttendenceModal] = React.useState(false);

  const toggleRemoveAdminModal = (): void =>
    setShowRemoveAdminModal(!showRemoveAdminModal);
  const toggleEventAttendenceModal = (): void =>
  setShowEventAttendenceModal(!showEventAttendenceModal);

  const { t } = useTranslation('translation', {
    keyPrefix: 'orgPeopleListCard',
  });

  const removeMember = async (): Promise<void> => {
    try {
      const { data } = await remove({
        variables: {
          userid: props.id,
          orgid: currentUrl,
        },
      });

      /* istanbul ignore next */
      if (data) {
        toast.success(t('memberRemoved'));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error: any) {
      /* istanbul ignore next */
      errorHandler(t, error);
    }
  };
  console.log('props', props);
  return (
    <div>
      <Button
        className={styles.memberfontcreatedbtn}
        data-testid="removeMemberModalBtn"
        onClick={toggleRemoveAdminModal}
      >
        {t('remove')}
      </Button>
      <Button
        className={styles.memberfontcreatedbtn}
        data-testid="event-attendence-button"
        onClick={toggleEventAttendenceModal}
      >
        Event Attendence
      </Button>
      <hr></hr>
      <Modal show={showRemoveAdminModal} onHide={toggleRemoveAdminModal}>
        <Modal.Header>
          <h5>{t('removeMember')}</h5>
          <Button variant="danger" onClick={toggleRemoveAdminModal}>
            <i className="fa fa-times"></i>
          </Button>
        </Modal.Header>
        <Modal.Body>{t('removeMemberMsg')}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={toggleRemoveAdminModal}>
            {t('no')}
          </Button>
          <Button
            type="button"
            className="btn btn-success"
            onClick={removeMember}
            data-testid="removeMemberBtn"
          >
            {t('yes')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEventAttendenceModal} onHide={toggleEventAttendenceModal}>
        <Modal.Header>
          <h5>{props.firstName} {props.lastName}'s Attended Events</h5>
          <Button variant="danger" onClick={toggleEventAttendenceModal}>
            <i className="fa fa-times"></i>
          </Button>
        </Modal.Header>
        <Modal.Body>{t('removeMemberMsg')}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={toggleEventAttendenceModal}>
            {t('no')}
          </Button>
          <Button
            type="button"
            className="btn btn-success"
            onClick={removeMember}
            data-testid="removeMemberBtn"
          >
            {t('yes')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export {};
export default orgPeopleListCard;
