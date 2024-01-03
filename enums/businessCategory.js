function generatePath(key) {    
    return `//mat-option[normalize-space()='${key}']`;
}

module.exports = {
    DU_LICH: generatePath("Du lịch"),
    DICH_VU_AN_UONG: generatePath("Dịch vụ ăn uống"),
    QUAN_LY_DICH_VU: generatePath("Quản lý dịch vụ"),
    THUONG_MAI_DIEN_TU: generatePath("Thương mại điện tử"),
    GIAO_DUC: generatePath("Giáo dục"),
    CHAM_SOC_SUC_KHOE: generatePath("Chăm sóc sức khỏe"),
    THAM_MY: generatePath("Thẩm mỹ"),
    BAO_HIEM: generatePath("Bảo hiểm"),
    VAN_TAI: generatePath("Vận tải"),
    GIAI_PHAP_TAI_CHINH: generatePath("Giải pháp tài chính"),
    Y_TE: generatePath("Y tế"),
    GIAI_TRI: generatePath("Giải trí"),
    SIEU_THI: generatePath("Siêu thị"),
    KHAC: generatePath("Khác"),
};