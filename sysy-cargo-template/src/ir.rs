// ir.rs
use koopa::ir::{Program, FunctionData, Value, ValueKind};
use std::io::Result;

pub trait GenerateAsm {
    fn generate(&self) -> Result<String>;
}
trait GetInteger {
    fn get_integer(&self, value_id: Value) -> Result<i32>;
}

impl GenerateAsm for Program {
    fn generate(&self) -> Result<String> {
        let mut riscv_code = String::new();
        riscv_code.push_str("  .text\n");
        riscv_code.push_str("  .globl main\n");
        riscv_code.push_str("main:           # @main\n");
        riscv_code.push_str("    li a0, "); // 加载立即数到寄存器 a0
        for &func in self.func_layout() {
          let func_data = &self.func(func);
          for (&bb, node) in func_data.layout().bbs() {
            for &inst in node.insts().keys() {
              let value_data_node = func_data.dfg().value(inst);
              match value_data_node.kind() {
                ValueKind::Integer(_int) => {
                  //
                }
                ValueKind::Return(ret) => {
                  let value_id = ret.value().unwrap();
                  let value =func_data.get_integer(value_id).unwrap();
                  riscv_code.push_str(&value.to_string());
                  riscv_code.push_str("\n");
                  riscv_code.push_str("    ret\n");
                }
                // 其他种类暂时遇不到
                _ => unreachable!(),
              }
              // 访问指令
              // ...
            }
          }
        }
        Ok(riscv_code)
    }
}

impl GetInteger for FunctionData {
    fn get_integer(&self, value_id: Value) -> Result<i32> {
        let value_use = self.dfg().values();
        let data = value_use.get(&value_id).unwrap();
        match data.kind() {
            ValueKind::Integer(int) => {
                let value = int.value();
                Ok(value)
            }
            _ => unreachable!(),
        }
    }
}