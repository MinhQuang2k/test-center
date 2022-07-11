import { Carousel } from 'antd';
import React from 'react';

function CarouselLogin(props) {
    return (
        <div className='CarouselLogin'>
            <Carousel>
                <div>

                    <img src='https://app.testcenter.vn/images/auth/e-learning.png' />


                    <h4>
                        Tạo bài Test dễ dàng
                    </h4>


                    <p>
                        Dễ dàng tạo bài kiểm tra online không giới hạn số lượng với nhiều dạng câu hỏi khác
                        nhau: trắc nghiệm, đúng/sai, tự luận, matching, điền vào chỗ trống, câu hỏi nhóm….
                        đáp ứng hầu hết nhu cầu của các vị trí trong mọi ngành nghề, lĩnh vực.
                    </p>


                </div>
                <div>


                    <img src='https://app.testcenter.vn/images/auth/report.png' />


                    <h4>
                        Tự động tổng hợp kết quả
                    </h4>


                    <p>
                        Hệ thống tự động chấm điểm hỗ trợ tối đa việc lọc kết quả của từng thí sinh.
                        Tổng hợp kết quả nhanh chóng, giúp tiết kiệm thời gian, giảm thiểu công sức và hạn chế tối đa sai sót.
                    </p>


                </div>
                <div>
                    <img src='https://app.testcenter.vn/images/auth/online-courses.png' />
                    <h4>
                        Đánh giá năng lực dựa trên dữ liệu cụ thể
                    </h4>
                    <p>
                        Đánh giá năng lực ứng viên/nhân viên trên nhiều khía cạnh thông qua các bài test online.
                        Hỗ trợ tạo form mẫu đánh giá ứng viên sau phỏng vấn, nhằm đưa ra các quyết định chính xác
                        trong tuyển dụng & quản trị nhân sự. Đảm bảo tính công bằng, nhất quán trong quy trình đánh giá.
                    </p>
                </div>
            </Carousel>
        </div>
    );
}

export default CarouselLogin;