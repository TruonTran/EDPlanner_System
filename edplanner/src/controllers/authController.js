// controllers/authController.js
import { getUserByEmail } from "../models/authModel";

// hàm xử lý đăng nhập
export async function login(email, password) {
    // kiểm tra nếu người dùng chưa nhập email hoặc mật khẩu
    if (!email || !password) {
        return { success: false, message: "Please enter email and password" };
    }
    // kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: "Invalid email format" };
    }

    try {
        const data = await getUserByEmail(email);
        if (data.length === 0) {
            return { success: false, message: "Email does not exist" };
        }
        const user = data[0];
        if (user.password !== password) {
            return { success: false, message: "Wrong password" };
        }
        return { success: true, user };
    } catch {
        return { success: false, message: "Server error" };
    }
}
