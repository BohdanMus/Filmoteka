import { onOpenModalTeamClick } from './team-modal';

const refs = {
  openModalTeamBtn: document.getElementById('open-modal-btn'),
};

// Обробник події для відкриття модального вікна з командою
refs.openModalTeamBtn.addEventListener('click', onOpenModalTeamClick);
