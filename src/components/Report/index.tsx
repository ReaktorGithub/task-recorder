/** @format */

import {
  ButtonLabelText,
  CopyButton,
  DateText,
  OpenButton,
  RemoveButton,
  ReportContainer,
  ReportContentBox,
  ReportHeaderBox,
  ReportList,
  ReportText,
  Root,
} from './styles.ts';
import {useState} from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import {useAppContext} from '../../context/appContext.tsx';
import {Box, Modal} from '@mui/material';
import {getTodayDateString} from '../../helpers/getTodayDateString.ts';
import {ContentCopy, Delete} from '@mui/icons-material';
import {isBefore} from 'date-fns';
import {copyDataToClipboard} from '../../helpers/copyDataToClipboard.ts';
import {ModalContent} from '../modals/ModalRemove';
import type {DayReport} from '../../types.ts';

const Report = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reportToRemove, setTaskToRemove] = useState<DayReport | null>(null);

  const {reports, onRemoveReport} = useAppContext();

  const toggleOpen = () => {
    setOpen(prev => !prev);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (report: DayReport) => {
    setTaskToRemove(report);
    setOpenModal(true);
  };

  const handleConfirmRemove = () => {
    if (reportToRemove) {
      onRemoveReport(reportToRemove.id);
    }
    setOpenModal(false);
  };

  const sortedData = [...reports].sort((a, b) => {
    if (isBefore(a.collectedOn, b.collectedOn)) return 1;
    if (isBefore(b.collectedOn, a.collectedOn)) return -1;
    return 0;
  });

  return (
    <Root width={open ? 350 : 32}>
      <OpenButton onClick={toggleOpen} isOpen={open}>
        <ArrowCircleRightOutlinedIcon fontSize='large' />
      </OpenButton>
      {!open && <ButtonLabelText>Отчёт</ButtonLabelText>}

      <ReportContainer width={open ? 350 : 0}>
        <ReportList>
          {sortedData.map(report => {
            return (
              <Box key={report.id}>
                <ReportHeaderBox>
                  <DateText>{getTodayDateString(report.collectedOn)}</DateText>
                  <RemoveButton onClick={() => handleOpenModal(report)}>
                    <Delete fontSize='small' />
                  </RemoveButton>
                </ReportHeaderBox>

                <ReportContentBox>
                  <CopyButton onClick={() => copyDataToClipboard(report.report)}>
                    <ContentCopy fontSize='small' />
                  </CopyButton>
                  <ReportText>{report.report}</ReportText>
                </ReportContentBox>
              </Box>
            );
          })}
        </ReportList>
      </ReportContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalContent
          taskToRemoveId={reportToRemove?.id || null}
          taskToRemoveText={reportToRemove?.report || ''}
          onConfirm={handleConfirmRemove}
          onClose={handleCloseModal}
          question='запись из отчёта'
        />
      </Modal>
    </Root>
  );
};

export {Report};
