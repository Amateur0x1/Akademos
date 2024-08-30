use super::{basic::Number, exp::Exp};

// 定义语句
#[derive(Debug)]
pub enum Stmt {
    ReturnExp(Exp),
    ReturnNumber(Number),
}