### Convert between Hex and Decimal

- **Decimal to Hexadecimal**: To convert a decimal number to hexadecimal, you repeatedly divide the decimal number by 16, keeping track of the remainders. The remainders, read from bottom to top, form the hexadecimal equivalent.

- **Example**: Convert `314156` (decimal) to hexadecimal:

  1. \( 314156 \div 16 = 19634 \) with remainder **12** (which is `C` in hex)
  2. \( 19634 \div 16 = 1227 \) with remainder **2**
  3. \( 1227 \div 16 = 76 \) with remainder **11** (which is `B` in hex)
  4. \( 76 \div 16 = 4 \) with remainder **12** (which is `C` in hex)
  5. \( 4 \div 16 = 0 \) with remainder **4**

  Reading the remainders from bottom to top: `0x4CB2C`

  So, the decimal number `314156` in hexadecimal is `0x4CB2C`.

- **Hexadecimal to Decimal**: To convert a hexadecimal number to decimal, each digit is multiplied by the power of 16 based on its position (starting from the right with position 0).

  - Example: Convert `0x4CB2C` to decimal:

    - \( 4 \times 16^4 = 4 \times 65536 = 262144 \)
    - \( C(12) \times 16^3 = 12 \times 4096 = 49152 \)
    - \( B(11) \times 16^2 = 11 \times 256 = 2816 \)
    - \( 2 \times 16^1 = 2 \times 16 = 32 \)
    - \( C(12) \times 16^0 = 12 \times 1 = 12 \)

    Summing these values:  
    \( 262144 + 49152 + 2816 + 32 + 12 = 314156 \)

### 32-bit and 64-bit Program

- **32-bit Program Compilation**: In a 32-bit program, the system's word size is 32 bits, meaning it can handle integers, memory addresses, and other data types that are 32 bits wide. The maximum value that can be represented in an unsigned 32-bit integer is \(2^{32} - 1\).

  To compile a program for a 32-bit system using `gcc`:
  ```bash
  gcc -m32 -o a.out a.c
  ```
  The `-m32` flag instructs the compiler to generate a 32-bit executable, even if you are on a 64-bit machine.

- **64-bit Program**: In a 64-bit program, the word size is 64 bits, allowing for much larger values to be represented (up to \(2^{64} - 1\) for unsigned integers). Memory addresses and integer types are 64 bits wide.

  The default behavior on most modern machines (64-bit systems) is to generate 64-bit executables without needing any special flag.

#### Differences between 32-bit and 64-bit programs:

- **Memory Access**: 64-bit programs can access more memory (theoretically up to 16 exabytes, practically limited by the operating system) compared to 32-bit programs, which are limited to 4 GB of RAM.
- **Performance**: 64-bit programs can handle larger data and may offer better performance for certain types of computations. However, they may use more memory since pointers and certain data types are larger.
- **Compatibility**: A 32-bit program can run on a 64-bit system with the necessary libraries, but a 64-bit program cannot run on a 32-bit system.

These notes should help you understand the basics of hexadecimal and decimal conversions, as well as the distinctions between 32-bit and 64-bit programs.

### Addressing and Byte Ordering

#### Big endian

#### Little endian


### The Following Machines Used



### Boolean Algebra


### Masking Operations

### 


