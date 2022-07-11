export function parseDuration(time) {
  let times = time.split(":");
  return Number(times[2]) + Number(times[1]) * 60 + Number(times[0]) * 3600;
}

export function formatTime(time) {
  let hour = Math.floor(time / 3600);
  let minute = Math.floor((time - hour * 3600) / 60);
  let second = time - minute * 60 - hour * 3600;
  if (hour <= 9) hour = "0" + hour;
  if (minute <= 9) minute = "0" + minute;
  if (second <= 9) second = "0" + second;
  return hour + ":" + minute + ":" + second;
}

export function subDateTime(dateTime1, dateTime2) {
  return formatTime(
    Math.abs((Date.parse(dateTime1) - Date.parse(dateTime2)) / 1000)
  );
}

export const typeApiCandidates = function (item) {
  this.complete_percent = item.complete_percent || null;
  this.createdAt = item.createdAt || null;
  this.email = item.email || null;
  this.endAt = item.endAt || null;
  this.fullname = item.fullname || null;
  this.group = item.group || null;
  this.id = item.userID || null;
  this.identify_code = item.identify_code || null;
  this.is_grading_it_questions =
    item.is_grading_it_questions ||
    (item.is_grading_it_questions === false ? false : null);
  this.is_passed = item.is_passed || (item.is_passed === false ? false : null);
  this.max_score = item.max_score || null;
  this.need_grade = item.need_grade || null;
  this.phone = item.phoneNumber || null;
  this.position = item.job_position || null;
  this.score = item.score || null;
  this.startAt = item.startAt || null;
  this.test_campaign = {
    id: item.examinationsID || null,
    name: item.name || null,
  };
  this.test = {
    id: item.Test?.id || null,
    name: item.Test?.name || null,
  };
  this.time_do_test = item.time_do_test || null;
  this.total_need_grade_answer = item.total_need_grade_answer || null;
};

export const typeApiTests = function (item) {
  this.average_completion_percent = item.average_completion_percent || 0;
  this.average_completion_time = item.average_completion_time || null;
  this.average_score = item.average_score || 0;
  this.createdAt = item.createdAt || null;
  this.id = item.id || null;
  this.name = item.name || null;
  this.total_answer_sheet = item.total_answer_sheet || null;
  this.total_answer_sheet_completed = item.total_answer_sheet_completed || null;
  this.updatedAt = item.updatedAt || null;
};

export const typeApiTestCampains = function (item) {
  this.average_completion_percent = item.average_completion_percent || 0;
  this.average_completion_time = item.average_completion_time || null;
  this.average_score = item.average_score || 0;
  this.createdAt = item.createdAt || null;
  this.id = item.id || null;
  this.name = item.name || null;
  this.total_answer_sheet = item.total_answer_sheet || null;
  this.total_answer_sheet_completed = item.total_answer_sheet_completed || null;
  this.updatedAt = item.updatedAt || null;
};

export const typeApiTestResults = function (item) {
  this.complete_percent = item.complete_percent || null;
  this.createdAt = item.createdAt || null;
  this.endAt = item.endAt || null;
  this.full_name = item.fullname || null;
  this.id = item.id || null;
  this.is_grading_it_questions =
    item.is_grading_it_questions ||
    (item.is_grading_it_questions === false ? false : null);
  this.is_passed = item.is_passed || (item.is_passed === false ? false : null);
  this.max_score = item.max_score || null;
  this.need_grade = item.need_grade || null;
  this.score = item.score || null;
  this.startAt = item.startAt || null;
  this.time_do_test = item.time_do_test || null;
};

export const typeApiCampaignResult = function (item) {
  this.complete_percent = item.complete_percent || null;
  this.createdAt = item.createdAt || null;
  this.endAt = item.endAt || null;
  this.full_name = item.fullname || null;
  this.id = item.id || null;
  this.is_grading_it_questions =
    item.is_grading_it_questions ||
    (item.is_grading_it_questions === false ? false : null);
  this.is_passed = item.is_passed || (item.is_passed === false ? false : null);
  this.max_score = item.max_score || null;
  this.need_grade = item.need_grade || null;
  this.score = item.score || null;
  this.startAt = item.startAt || null;
  this.time_do_test = item.time_do_test || null;
};
