using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace QuanLy.Models
{
    public partial class QuanLyVanBanContext : DbContext
    {
        public QuanLyVanBanContext()
        {
        }

        public QuanLyVanBanContext(DbContextOptions<QuanLyVanBanContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Butphe> Butphe { get; set; }
        public virtual DbSet<Chucnang> Chucnang { get; set; }
        public virtual DbSet<Congviec> Congviec { get; set; }
        public virtual DbSet<Donvi> Donvi { get; set; }
        public virtual DbSet<Doquantrong> Doquantrong { get; set; }
        public virtual DbSet<Hoso> Hoso { get; set; }
        public virtual DbSet<Lichlamviec> Lichlamviec { get; set; }
        public virtual DbSet<Linhvuc> Linhvuc { get; set; }
        public virtual DbSet<Loaivanban> Loaivanban { get; set; }
        public virtual DbSet<Nhanvien> Nhanvien { get; set; }
        public virtual DbSet<Noiphathanh> Noiphathanh { get; set; }
        public virtual DbSet<Nvbutphe> Nvbutphe { get; set; }
        public virtual DbSet<Quyen> Quyen { get; set; }
        public virtual DbSet<Quyenvb> Quyenvb { get; set; }
        public virtual DbSet<Thanhphanthamdu> Thanhphanthamdu { get; set; }
        public virtual DbSet<Vaitro> Vaitro { get; set; }
        public virtual DbSet<Vanban> Vanban { get; set; }
        public virtual DbSet<VanBanDTO> VanBanDTO { get; set; }
        public virtual DbSet<Xulycongviec> Xulycongviec { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server = MYPC\\SQLEXPRESS; Database = QuanLyVanBan; Trusted_Connection = True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Butphe>(entity =>
            {
                entity.HasKey(e => e.Idbutphe);

                entity.ToTable("BUTPHE");

                entity.Property(e => e.Idbutphe)
                    .HasColumnName("IDBUTPHE")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Idvb)
                    .HasColumnName("IDVB")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ngaybutphe)
                    .HasColumnName("NGAYBUTPHE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Noidungbutphe)
                    .HasColumnName("NOIDUNGBUTPHE")
                    .HasMaxLength(3000);

                entity.HasOne(d => d.IdvbNavigation)
                    .WithMany(p => p.Butphe)
                    .HasForeignKey(d => d.Idvb)
                    .HasConstraintName("FK_BUTPHE_VANBAN");
            });

            modelBuilder.Entity<Chucnang>(entity =>
            {
                entity.HasKey(e => e.Idcn);

                entity.ToTable("CHUCNANG");

                entity.Property(e => e.Idcn)
                    .HasColumnName("IDCN")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tencn)
                    .HasColumnName("TENCN")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Congviec>(entity =>
            {
                entity.HasKey(e => e.Idcongviec);

                entity.ToTable("CONGVIEC");

                entity.HasIndex(e => e.Iddqt)
                    .HasName("GOM CO_FK");

                entity.HasIndex(e => e.Idhoso)
                    .HasName("BAO GOM_FK");

                entity.HasIndex(e => e.Idlv)
                    .HasName("THUOC LINH VUC_FK");

                entity.Property(e => e.Idcongviec)
                    .HasColumnName("IDCONGVIEC")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Filedinhkem)
                    .HasColumnName("FILEDINHKEM")
                    .HasMaxLength(1000);

                entity.Property(e => e.Hanxuly)
                    .HasColumnName("HANXULY")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iddqt)
                    .IsRequired()
                    .HasColumnName("IDDQT")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Idhoso)
                    .HasColumnName("IDHOSO")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Idlv)
                    .HasColumnName("IDLV")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ngaygioht)
                    .HasColumnName("NGAYGIOHT")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ngaygiomo)
                    .HasColumnName("NGAYGIOMO")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tieude)
                    .HasColumnName("TIEUDE")
                    .HasMaxLength(500);

                entity.Property(e => e.Tyleht).HasColumnName("TYLEHT");

                entity.HasOne(d => d.IddqtNavigation)
                    .WithMany(p => p.Congviec)
                    .HasForeignKey(d => d.Iddqt)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CONGVIEC_GOM CO_DOQUANTR");

                entity.HasOne(d => d.IdhosoNavigation)
                    .WithMany(p => p.Congviec)
                    .HasForeignKey(d => d.Idhoso)
                    .HasConstraintName("FK_CONGVIEC_BAO GOM_HOSO");

                entity.HasOne(d => d.IdlvNavigation)
                    .WithMany(p => p.Congviec)
                    .HasForeignKey(d => d.Idlv)
                    .HasConstraintName("FK_CONGVIEC_THUOC LIN_LINHVUC");
            });

            modelBuilder.Entity<Donvi>(entity =>
            {
                entity.HasKey(e => e.Iddonvi);

                entity.ToTable("DONVI");

                entity.Property(e => e.Iddonvi).HasColumnName("IDDONVI");

                entity.Property(e => e.Madonvi)
                    .HasColumnName("MADONVI")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tendonvi)
                    .HasColumnName("TENDONVI")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Doquantrong>(entity =>
            {
                entity.HasKey(e => e.Iddqt);

                entity.ToTable("DOQUANTRONG");

                entity.Property(e => e.Iddqt)
                    .HasColumnName("IDDQT")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tendqt)
                    .HasColumnName("TENDQT")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Hoso>(entity =>
            {
                entity.HasKey(e => e.Idhoso);

                entity.ToTable("HOSO");

                entity.Property(e => e.Idhoso)
                    .HasColumnName("IDHOSO")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenhoso)
                    .HasColumnName("TENHOSO")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Lichlamviec>(entity =>
            {
                entity.HasKey(e => e.Idlich);

                entity.ToTable("LICHLAMVIEC");

                entity.Property(e => e.Idlich)
                    .HasColumnName("IDLICH")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Diadiem)
                    .HasColumnName("DIADIEM")
                    .HasMaxLength(200);

                entity.Property(e => e.Giobd)
                    .HasColumnName("GIOBD")
                    .HasMaxLength(30);

                entity.Property(e => e.Giokt)
                    .HasColumnName("GIOKT")
                    .HasMaxLength(30);

                entity.Property(e => e.Ngaybd)
                    .HasColumnName("NGAYBD")
                    .HasColumnType("date");

                entity.Property(e => e.Noidungcv)
                    .HasColumnName("NOIDUNGCV")
                    .HasMaxLength(3500);

                entity.Property(e => e.Thanhphankhac)
                    .HasColumnName("THANHPHANKHAC")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Linhvuc>(entity =>
            {
                entity.HasKey(e => e.Idlv);

                entity.ToTable("LINHVUC");

                entity.Property(e => e.Idlv)
                    .HasColumnName("IDLV")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenlv)
                    .HasColumnName("TENLV")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Loaivanban>(entity =>
            {
                entity.HasKey(e => e.Idloai);

                entity.ToTable("LOAIVANBAN");

                entity.Property(e => e.Idloai).HasColumnName("IDLOAI");

                entity.Property(e => e.Maloai)
                    .HasColumnName("MALOAI")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenloai)
                    .HasColumnName("TENLOAI")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Nhanvien>(entity =>
            {
                entity.HasKey(e => e.Idnv);

                entity.ToTable("NHANVIEN");

                entity.HasIndex(e => e.Iddonvi)
                    .HasName("THUOC_FK");

                entity.HasIndex(e => e.Idvaitro)
                    .HasName("CO_FK");

                entity.Property(e => e.Idnv).HasColumnName("IDNV");

                entity.Property(e => e.Daxoa).HasColumnName("DAXOA");

                entity.Property(e => e.Diachi)
                    .HasColumnName("DIACHI")
                    .HasMaxLength(200);

                entity.Property(e => e.Hoten)
                    .HasColumnName("HOTEN")
                    .HasMaxLength(100);

                entity.Property(e => e.Iddonvi).HasColumnName("IDDONVI");

                entity.Property(e => e.Idvaitro)
                    .IsRequired()
                    .HasColumnName("IDVAITRO")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Manv)
                    .HasColumnName("MANV")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ngaysinh)
                    .HasColumnName("NGAYSINH")
                    .HasColumnType("date");

                entity.Property(e => e.Password)
                    .HasColumnName("PASSWORD")
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Sdt)
                    .HasColumnName("SDT")
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Username)
                    .HasColumnName("USERNAME")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.IddonviNavigation)
                    .WithMany(p => p.Nhanvien)
                    .HasForeignKey(d => d.Iddonvi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NHANVIEN_THUOC_DONVI");

                entity.HasOne(d => d.IdvaitroNavigation)
                    .WithMany(p => p.Nhanvien)
                    .HasForeignKey(d => d.Idvaitro)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NHANVIEN_CO_VAITRO");
            });

            modelBuilder.Entity<Noiphathanh>(entity =>
            {
                entity.HasKey(e => e.Idph);

                entity.ToTable("NOIPHATHANH");

                entity.Property(e => e.Idph)
                    .HasColumnName("IDPH")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenph)
                    .HasColumnName("TENPH")
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Nvbutphe>(entity =>
            {
                entity.HasKey(e => new { e.Idnv, e.Idbutphe });

                entity.ToTable("NVBUTPHE");

                entity.HasIndex(e => e.Idbutphe)
                    .HasName("NVBUTPHE2_FK");

                entity.HasIndex(e => e.Idnv)
                    .HasName("NVBUTPHE_FK");

                entity.Property(e => e.Idnv).HasColumnName("IDNV");

                entity.Property(e => e.Idbutphe)
                    .HasColumnName("IDBUTPHE")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.IdbutpheNavigation)
                    .WithMany(p => p.Nvbutphe)
                    .HasForeignKey(d => d.Idbutphe)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NVBUTPHE_NVBUTPHE2_BUTPHE");

                entity.HasOne(d => d.IdnvNavigation)
                    .WithMany(p => p.Nvbutphe)
                    .HasForeignKey(d => d.Idnv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NVBUTPHE_NVBUTPHE_NHANVIEN");
            });

            modelBuilder.Entity<Quyen>(entity =>
            {
                entity.HasKey(e => new { e.Idvaitro, e.Idcn });

                entity.ToTable("QUYEN");

                entity.HasIndex(e => e.Idcn)
                    .HasName("QUYEN2_FK");

                entity.HasIndex(e => e.Idvaitro)
                    .HasName("QUYEN_FK");

                entity.Property(e => e.Idvaitro)
                    .HasColumnName("IDVAITRO")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Idcn)
                    .HasColumnName("IDCN")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Trangthai).HasColumnName("TRANGTHAI");

                entity.HasOne(d => d.IdcnNavigation)
                    .WithMany(p => p.Quyen)
                    .HasForeignKey(d => d.Idcn)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QUYEN_QUYEN2_CHUCNANG");

                entity.HasOne(d => d.IdvaitroNavigation)
                    .WithMany(p => p.Quyen)
                    .HasForeignKey(d => d.Idvaitro)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QUYEN_QUYEN_VAITRO");
            });

            modelBuilder.Entity<Quyenvb>(entity =>
            {
                entity.HasKey(e => e.Idquyenvb);

                entity.ToTable("QUYENVB");

                entity.HasIndex(e => e.Idnv)
                    .HasName("CO QUYEN_FK");

                entity.HasIndex(e => e.Idvb)
                    .HasName("DUOC CAP QUYEN VB_FK");

                entity.Property(e => e.Idquyenvb)
                    .HasColumnName("IDQUYENVB")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Daxuly).HasColumnName("DAXULY");

                entity.Property(e => e.Idnv).HasColumnName("IDNV");

                entity.Property(e => e.Idvb)
                    .IsRequired()
                    .HasColumnName("IDVB")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Quyen)
                    .HasColumnName("QUYEN")
                    .HasMaxLength(100);

                entity.HasOne(d => d.IdnvNavigation)
                    .WithMany(p => p.Quyenvb)
                    .HasForeignKey(d => d.Idnv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QUYENVB_CO QUYEN_NHANVIEN");

                entity.HasOne(d => d.IdvbNavigation)
                    .WithMany(p => p.Quyenvb)
                    .HasForeignKey(d => d.Idvb)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QUYENVB_DUOC CAP _VANBAN");
            });

            modelBuilder.Entity<Thanhphanthamdu>(entity =>
            {
                entity.HasKey(e => new { e.Idlich, e.Idnv });

                entity.ToTable("THANHPHANTHAMDU");

                entity.HasIndex(e => e.Idlich)
                    .HasName("THANHPHANTHAMDU_FK");

                entity.HasIndex(e => e.Idnv)
                    .HasName("THANHPHANTHAMDU2_FK");

                entity.Property(e => e.Idlich)
                    .HasColumnName("IDLICH")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Idnv).HasColumnName("IDNV");

                entity.HasOne(d => d.IdlichNavigation)
                    .WithMany(p => p.Thanhphanthamdu)
                    .HasForeignKey(d => d.Idlich)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_THANHPHA_THANHPHAN_LICHLAMV");

                entity.HasOne(d => d.IdnvNavigation)
                    .WithMany(p => p.Thanhphanthamdu)
                    .HasForeignKey(d => d.Idnv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_THANHPHA_THANHPHAN_NHANVIEN");
            });

            modelBuilder.Entity<Vaitro>(entity =>
            {
                entity.HasKey(e => e.Idvaitro);

                entity.ToTable("VAITRO");

                entity.Property(e => e.Idvaitro)
                    .HasColumnName("IDVAITRO")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenvaitro)
                    .HasColumnName("TENVAITRO")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Vanban>(entity =>
            {
                entity.HasKey(e => e.Idvb);

                entity.ToTable("VANBAN");

                entity.HasIndex(e => e.Idloai)
                    .HasName("THUOC TRONG_FK");

                entity.HasIndex(e => e.Idph)
                    .HasName("TAI_FK");

                entity.Property(e => e.Idvb)
                    .HasColumnName("IDVB")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.File)
                    .HasColumnName("FILE")
                    .HasMaxLength(1000);

                entity.Property(e => e.Idloai).HasColumnName("IDLOAI");

                entity.Property(e => e.Idph)
                    .IsRequired()
                    .HasColumnName("IDPH")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ngaygoi)
                    .HasColumnName("NGAYGOI")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ngayky)
                    .HasColumnName("NGAYKY")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ngaynhan)
                    .HasColumnName("NGAYNHAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Nguoiky)
                    .HasColumnName("NGUOIKY")
                    .HasMaxLength(100);

                entity.Property(e => e.Sovb)
                    .HasColumnName("SOVB")
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Trichyeu)
                    .HasColumnName("TRICHYEU")
                    .HasMaxLength(4000);

                entity.HasOne(d => d.IdloaiNavigation)
                    .WithMany(p => p.Vanban)
                    .HasForeignKey(d => d.Idloai)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VANBAN_THUOC TRO_LOAIVANB");

                entity.HasOne(d => d.IdphNavigation)
                    .WithMany(p => p.Vanban)
                    .HasForeignKey(d => d.Idph)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VANBAN_TAI_NOIPHATH");
            });

            modelBuilder.Entity<Xulycongviec>(entity =>
            {
                entity.HasKey(e => new { e.Idcongviec, e.Idnv });

                entity.ToTable("XULYCONGVIEC");

                entity.HasIndex(e => e.Idcongviec)
                    .HasName("XULYCONGVIEC_FK");

                entity.HasIndex(e => e.Idnv)
                    .HasName("XULYCONGVIEC2_FK");

                entity.Property(e => e.Idcongviec)
                    .HasColumnName("IDCONGVIEC")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Idnv).HasColumnName("IDNV");

                entity.Property(e => e.Trangthaixuly).HasColumnName("TRANGTHAIXULY");

                entity.HasOne(d => d.IdcongviecNavigation)
                    .WithMany(p => p.Xulycongviec)
                    .HasForeignKey(d => d.Idcongviec)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_XULYCONG_XULYCONGV_CONGVIEC");

                entity.HasOne(d => d.IdnvNavigation)
                    .WithMany(p => p.Xulycongviec)
                    .HasForeignKey(d => d.Idnv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_XULYCONG_XULYCONGV_NHANVIEN");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
