function generatePath(key) {
    return `//span[contains(text(),'${key}')]`;
}

module.exports = {
    CHU_TICH_HOI_DONG_QUAN_TRI: generatePath("Chủ tịch Hội đồng quản trị"),
    CHU_TICH_HOI_DONG_THANH_VIEN: generatePath("Chủ tịch Hội đồng thành viên"),
    TONG_GIAM_DOC: generatePath("Tổng giám đốc"),
    GIAM_DOC: generatePath("Giám đốc"),
    KHAC: generatePath("Khác"),
};