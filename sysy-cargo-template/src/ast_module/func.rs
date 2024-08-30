use super::block::Block;
use std::{hash::{Hash, Hasher}};

// 定义函数类型
#[derive(Debug)]
pub enum FuncType {
    Int,
    Void,
}

// 定义函数定义
#[derive(Debug)]
pub struct FuncDef {
    pub func_type: FuncType,
    pub ident: String,
    pub block: Block,
}

// 手动实现 PartialEq trait
impl PartialEq for FuncType {
    fn eq(&self, other: &Self) -> bool {
        std::mem::discriminant(self) == std::mem::discriminant(other)
    }
}

// 手动实现 Eq 和 Hash trait
impl Eq for FuncType {}

impl Hash for FuncType {
    fn hash<H: Hasher>(&self, state: &mut H) {
        std::mem::discriminant(self).hash(state);
    }
}