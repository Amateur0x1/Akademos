use std::collections::HashMap;
use super::func::{FuncDef, FuncType};
use super::stmt::Stmt::{ReturnNumber, ReturnExp};
// 定义编译单元
#[derive(Debug)]
pub struct CompUnit {
    pub func_def: FuncDef,
}

pub trait GenerateIR {
    fn fmt(&self) -> Result<String, Box<dyn std::error::Error>>;
}

impl GenerateIR for CompUnit {
    fn fmt(&self) -> Result<String, Box<dyn std::error::Error>> {
        // 定义函数返回类型的映射关系
        let mut type_mapping: HashMap<FuncType, String> = HashMap::new();
        type_mapping.insert(FuncType::Int, String::from("i32"));
        type_mapping.insert(FuncType::Void, String::from("()"));

        // 转换函数定义
        let func_def = format!(
            "fun @{}(): {} {{\n",
            self.func_def.ident,
            type_mapping.get(&self.func_def.func_type).ok_or("Unknown function type")?
        );

        // 转换块内容
        let mut block_content = String::new();
        block_content.push_str("%entry:\n");
        match &self.func_def.block.stmt {
            ReturnNumber(number) => {
                block_content.push_str(&format!("  ret {}", number.value));
            }
            ReturnExp(exp) => {
                // block_content.push_str(&format!("  ret {}", exp.value));
            }
        }
        // 返回转换后的 Rust 代码
        Ok(format!("{}{}\n}}", func_def, block_content))
    }
}
