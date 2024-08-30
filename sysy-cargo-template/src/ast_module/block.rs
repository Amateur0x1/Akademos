use super::stmt::Stmt;

// 定义代码块
#[derive(Debug)]
pub struct Block {
    pub stmt: Stmt,
}