use super::basic::Number;
// 定义表达式类型
#[derive(Debug)]
pub enum Exp {
    UnaryExp(UnaryExp),
}

#[derive(Debug)]
pub enum PrimaryExp {
    Parenthesized(Box<Exp>), // 括号中的表达式
    Number(Number),          // 数字常量
}

#[derive(Debug)]
pub enum UnaryExp {
    Primary(PrimaryExp),     // 基本表达式
    UnaryOp(UnaryOp, Box<UnaryExp>), // 一元操作符表达式
}

#[derive(Debug)]
pub enum UnaryOp {
    Plus,
    Minus,
    Not,
}
